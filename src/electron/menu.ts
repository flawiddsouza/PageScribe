import { BrowserWindow, dialog } from 'electron';
import path from 'path';

const isMac = process.platform === 'darwin';

export function generateMenuTemplate(mainWindow: BrowserWindow) {
  const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File...',
          click: async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog({
              properties: ['openFile']
            });
            if (!canceled && filePaths.length > 0) {
              mainWindow.webContents.send('files-to-open', filePaths.map(filePath => ({
                id: path.basename(filePath),
                name: path.basename(filePath),
                type: 'file',
                basePath: path.dirname(filePath),
              })));
            }
          }
        },
        {
          label: 'Open Folder...',
          click: async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog({
              properties: ['openDirectory']
            });
            if (!canceled && filePaths.length > 0) {
              mainWindow.webContents.send('open-folder', filePaths[0]);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Close Folder',
          click: () => {
            mainWindow.webContents.send('close-folder');
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
  ];

  return menuTemplate;
}
