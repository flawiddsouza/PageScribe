import { app, BrowserWindow, protocol, screen, Menu } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import started from 'electron-squirrel-startup';
import windowStateKeeper from './utils/window-state';
import * as db from './db';
import './ipcHandlers';
import type { DirectoryItem } from 'src/ui/components/types';
import { generateMenuTemplate } from './menu';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

db.migrate();

const filesToOpen: DirectoryItem[]  = [];

const isMac = process.platform === 'darwin';

if (isMac) {
  app.on('open-file', (event, filePath) => {
    event.preventDefault();
    filesToOpen.push({
      id: path.basename(filePath),
      name: path.basename(filePath),
      type: 'file',
      basePath: path.dirname(filePath),
    });
  });
} else {
  const filePaths = process.argv.slice(1);
  for(const filePath of filePaths) {
    if (filePath === '.') {
      continue;
    }

    filesToOpen.push({
      id: path.basename(filePath),
      name: path.basename(filePath),
      type: 'file',
      basePath: path.dirname(filePath),
    });
  }
}

const createWindow = async() => {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // electron-devtools-installer
    const { default: installExtension, VUEJS_DEVTOOLS } = await import('electron-devtools-installer');
    installExtension(VUEJS_DEVTOOLS);
  }

  protocol.handle('plugins', async(request) => {
    const appPath = MAIN_WINDOW_VITE_DEV_SERVER_URL ? app.getAppPath() : path.join(app.getAppPath(), '..');
    const pluginDir = path.join(appPath, 'plugins');
    const filePath = request.url.slice('plugins://'.length);
    const finalPath = path.join(pluginDir, filePath);
    const fileContent = await fs.readFile(finalPath);

    let mimeType = '';
    if (filePath.endsWith('.js')) {
      mimeType = 'application/javascript';
    } else if (filePath.endsWith('.css')) {
      mimeType = 'text/css';
    }

    return new Response(fileContent, {
      headers: {
        'Content-Type': mimeType
      }
    });
  });

  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  const winStateOptions = {
    defaultWidth: parseInt((workAreaSize.width * 0.75).toString()),
    defaultHeight: parseInt((workAreaSize.height * 0.75).toString()),
    defaultMaximize: true,
  };
  const winState = windowStateKeeper(winStateOptions);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  winState.manage(mainWindow);

  const menu = Menu.buildFromTemplate(generateMenuTemplate(mainWindow));
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (filesToOpen.length > 0) {
      mainWindow.webContents.send('files-to-open', filesToOpen);
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
