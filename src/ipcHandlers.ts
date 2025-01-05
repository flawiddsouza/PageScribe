import { ipcMain, dialog } from 'electron';
import { getDirectoryTree } from './utils';

ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true, filePaths: [] };
  }
  return { canceled: false, filePaths: result.filePaths };
});

ipcMain.handle('get-directory-tree', async (event, folderPath: string) => {
  const directoryStructure = await getDirectoryTree(folderPath);
  return directoryStructure;
});
