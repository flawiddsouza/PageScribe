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

export async function readFile(filePath: string, basePath: string): Promise<string> {
  const fileContent = await window.electron.ipcRenderer.readFile(filePath, basePath);
  return fileContent;
}

export async function createFile(fileName: string, folderPath: string, basePath: string): Promise<void> {
  await window.electron.ipcRenderer.createFile(fileName, folderPath, basePath);
}

export async function createFolder(folderName: string, folderPath: string, basePath: string): Promise<void> {
  await window.electron.ipcRenderer.createFolder(folderName, folderPath, basePath);
}

export async function writeFile(basePath: string, filePath: string, fileContent: string): Promise<void> {
  await window.electron.ipcRenderer.writeFile(basePath, filePath, fileContent);
}
