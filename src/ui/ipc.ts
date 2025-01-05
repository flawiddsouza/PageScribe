import type { DirectoryItem } from './components/types';

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

export async function readFile(basePath: string, filePath: string): Promise<string> {
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
