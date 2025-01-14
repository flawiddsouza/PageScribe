import type { DirectoryItem, ReadFileResult, RenameFileOrFolderResult } from './components/types';
import type { PluginManifest } from '../shared/types';

export async function openFolder(): Promise<string | null> {
  const result = await window.electron.ipcRenderer.openFolder();
  if (result && !result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
}

export async function getDirectoryTree(filePath: string): Promise<DirectoryItem[]> {
  const directoryTree = await window.electron.ipcRenderer.getDirectoryTree(filePath);
  return directoryTree;
}

export async function readFile(basePath: string, filePath: string): Promise<ReadFileResult> {
  const fileContent = await window.electron.ipcRenderer.readFile(basePath, filePath);
  return fileContent;
}

export async function createFile(basePath: string, folderPath: string, fileName: string): Promise<void> {
  await window.electron.ipcRenderer.createFile(basePath, folderPath, fileName);
}

export async function createFolder(basePath: string, folderPath: string, folderName: string): Promise<void> {
  await window.electron.ipcRenderer.createFolder(basePath, folderPath, folderName);
}

export async function writeFile(basePath: string, filePath: string, fileContent: string): Promise<void> {
  await window.electron.ipcRenderer.writeFile(basePath, filePath, fileContent);
}

export async function deleteFile(basePath: string, filePath: string): Promise<void> {
  await window.electron.ipcRenderer.deleteFile(basePath, filePath);
}

export async function deleteFolder(basePath: string, folderPath: string): Promise<void> {
  await window.electron.ipcRenderer.deleteFolder(basePath, folderPath);
}

export async function renameFile(basePath: string, oldFilePath: string, newFileName: string): Promise<RenameFileOrFolderResult> {
  const oldIdNewIdMap = await window.electron.ipcRenderer.renameFile(basePath, oldFilePath, newFileName);
  return oldIdNewIdMap;
}

export async function renameFolder(basePath: string, oldFolderPath: string, newFolderName: string): Promise<RenameFileOrFolderResult> {
  const oldIdNewIdMap = await window.electron.ipcRenderer.renameFolder(basePath, oldFolderPath, newFolderName);
  return oldIdNewIdMap;
}

export async function moveFile(basePath: string, oldFilePath: string, moveToFolderPath: string): Promise<void> {
  await window.electron.ipcRenderer.moveFile(basePath, oldFilePath, moveToFolderPath);
}

export async function moveFolder(basePath: string, oldFolderPath: string, moveToFolderPath: string): Promise<void> {
  await window.electron.ipcRenderer.moveFolder(basePath, oldFolderPath, moveToFolderPath);
}

export async function getPluginManifests(): Promise<PluginManifest[]> {
  const manifests = await window.electron.ipcRenderer.getPluginManifests();
  return manifests;
}

export async function revealInFileExplorer(basePath: string, fileOrFolderPath: string): Promise<void> {
  await window.electron.ipcRenderer.revealInFileExplorer(basePath, fileOrFolderPath);
}

// folder config

export async function getOpenTabs(folderPath: string): Promise<{ openTabs: string[], activeTab: string }> {
  const result = await window.electron.ipcRenderer.getOpenTabs(folderPath);
  return result;
}

export async function saveOpenTabs(folderPath: string, openTabs: string[], activeTab: string): Promise<void> {
  await window.electron.ipcRenderer.saveOpenTabs(folderPath, openTabs, activeTab);
}

export async function getCollapsedFolders(folderPath: string): Promise<string[]> {
  const result = await window.electron.ipcRenderer.getCollapsedFolders(folderPath);
  return result;
}

export async function saveCollapsedFolders(folderPath: string, collapsedFolders: string[]): Promise<void> {
  await window.electron.ipcRenderer.saveCollapsedFolders(folderPath, collapsedFolders);
}
