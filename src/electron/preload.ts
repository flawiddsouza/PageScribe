import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openFolder: () => ipcRenderer.invoke('open-folder'),
    getDirectoryTree: (folderPath: string) => ipcRenderer.invoke('get-directory-tree', folderPath),
    readFile: (filePath: string, basePath: string) => ipcRenderer.invoke('read-file', filePath, basePath),
    createFile: (fileName: string, folderPath: string, basePath: string) => ipcRenderer.invoke('create-file', fileName, folderPath, basePath),
    createFolder: (folderName: string, folderPath: string, basePath: string) => ipcRenderer.invoke('create-folder', folderName, folderPath, basePath),
    writeFile: (basePath: string, filePath: string, fileContent: string) => ipcRenderer.invoke('write-file', basePath, filePath, fileContent),
  }
});
