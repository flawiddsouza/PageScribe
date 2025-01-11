import { ipcMain, dialog, shell } from 'electron';
import { getDirectoryTree, getPluginManifests } from './utils';
import fs from 'fs/promises';
import path from 'path';
import * as db from './db';

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

ipcMain.handle('move-file', async (event, basePath: string, oldFilePath: string, moveToFolderPath: string) => {
  const currentPath = path.join(basePath, oldFilePath);
  const targetPath = path.join(basePath, moveToFolderPath, path.basename(oldFilePath));
  console.log('moveFile', {
    currentPath,
    targetPath
  });
  await fs.rename(currentPath, targetPath);
});

ipcMain.handle('move-folder', async (event, basePath: string, oldFolderPath: string, moveToFolderPath: string) => {
  const currentPath = path.join(basePath, oldFolderPath);
  const targetPath = path.join(basePath, moveToFolderPath, path.basename(oldFolderPath));
  console.log('moveFolder', {
    currentPath,
    targetPath
  });
  await fs.rename(currentPath, targetPath);
});

ipcMain.handle('get-plugin-manifests', async () => {
  const manifests = await getPluginManifests();
  return manifests;
});

ipcMain.handle('reveal-in-file-explorer', async (event, basePath: string, fileOrFolderPath: string) => {
  shell.showItemInFolder(path.join(basePath, fileOrFolderPath));
});

// folder config

ipcMain.handle('get-open-tabs', async (event, folderPath: string) => {
  const { openTabs, activeTab } = db.getOpenTabs(folderPath);
  return { openTabs, activeTab };
});

ipcMain.handle('save-open-tabs', async (event, folderPath: string, openTabs: string[], activeTab: string) => {
  db.saveOpenTabs(folderPath, openTabs, activeTab);
});

ipcMain.handle('get-collapsed-folders', async (event, folderPath: string) => {
  const collapsedFolders = db.getCollapsedFolders(folderPath);
  return collapsedFolders;
});

ipcMain.handle('save-collapsed-folders', async (event, folderPath: string, collapsedFolders: string[]) => {
  db.saveCollapsedFolders(folderPath, collapsedFolders);
});
