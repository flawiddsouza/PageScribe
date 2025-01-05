import { ipcMain, dialog } from 'electron';
import { getDirectoryTree } from './utils';
import fs from 'fs/promises';
import path from 'path';

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

ipcMain.handle('read-file', async (event, filePath: string, basePath: string) => {
  const fileContent = await fs.readFile(path.join(basePath, filePath), 'utf8');
  return fileContent;
});

ipcMain.handle('create-file', async (event, fileName: string, folderPath: string, basePath: string) => {
  await fs.writeFile(path.join(basePath, folderPath, fileName), '');
});

ipcMain.handle('create-folder', async (event, folderName: string, folderPath: string, basePath: string) => {
  await fs.mkdir(path.join(basePath, folderPath, folderName));
});

ipcMain.handle('write-file', async (event, basePath: string, filePath: string, fileContent: string) => {
  await fs.writeFile(path.join(basePath, filePath), fileContent);
});
