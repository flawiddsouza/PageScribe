import { ipcMain, dialog } from 'electron';
import { getDirectoryTree, getPluginManifests } from './utils';
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

ipcMain.handle('read-file', async (event, basePath: string, filePath: string) => {
  const extension = path.extname(filePath);
  const fileContent = await fs.readFile(path.join(basePath, filePath), 'utf8');
  return { extension, fileContent };
});

ipcMain.handle('create-file', async (event, basePath: string, folderPath: string, fileName: string) => {
  await fs.writeFile(path.join(basePath, folderPath, fileName), '');
});

ipcMain.handle('create-folder', async (event, basePath: string, folderPath: string, folderName: string) => {
  await fs.mkdir(path.join(basePath, folderPath, folderName));
});

ipcMain.handle('write-file', async (event, basePath: string, filePath: string, fileContent: string) => {
  await fs.writeFile(path.join(basePath, filePath), fileContent);
});

ipcMain.handle('delete-file', async (event, basePath: string, filePath: string) => {
  await fs.rm(path.join(basePath, filePath));
});

ipcMain.handle('delete-folder', async (event, basePath: string, folderPath: string) => {
  await fs.rm(path.join(basePath, folderPath), { recursive: true });
});

ipcMain.handle('rename-file', async (event, basePath: string, oldFilePath: string, newFileName: string) => {
  const newFilePath = path.join(path.dirname(oldFilePath), newFileName);
  await fs.rename(path.join(basePath, oldFilePath), path.join(basePath, newFilePath));
});

ipcMain.handle('rename-folder', async (event, basePath: string, oldFolderPath: string, newFolderName: string) => {
  const newFolderPath = path.join(path.dirname(oldFolderPath), newFolderName);
  await fs.rename(path.join(basePath, oldFolderPath), path.join(basePath, newFolderPath));
});

ipcMain.handle('get-plugin-manifests', async () => {
  const manifests = await getPluginManifests();
  return manifests;
});
