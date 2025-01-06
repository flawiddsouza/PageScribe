import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openFolder: () => ipcRenderer.invoke('open-folder'),
    getDirectoryTree: (folderPath: string) => ipcRenderer.invoke('get-directory-tree', folderPath),
    readFile: (basePath: string, filePath: string) => ipcRenderer.invoke('read-file', basePath, filePath),
    createFile: (basePath: string, folderPath: string, fileName: string) => ipcRenderer.invoke('create-file', basePath, folderPath, fileName),
    createFolder: (basePath: string, folderPath: string, folderName: string) => ipcRenderer.invoke('create-folder', basePath, folderPath, folderName),
    writeFile: (basePath: string, filePath: string, fileContent: string) => ipcRenderer.invoke('write-file', basePath, filePath, fileContent),
    deleteFile: (basePath: string, filePath: string) => ipcRenderer.invoke('delete-file', basePath, filePath),
    deleteFolder: (basePath: string, folderPath: string) => ipcRenderer.invoke('delete-folder', basePath, folderPath),
    renameFile: (basePath: string, oldFilePath: string, newFileName: string) => ipcRenderer.invoke('rename-file', basePath, oldFilePath, newFileName),
    renameFolder: (basePath: string, oldFolderPath: string, newFolderName: string) => ipcRenderer.invoke('rename-folder', basePath, oldFolderPath, newFolderName),
    getPluginManifests: () => ipcRenderer.invoke('get-plugin-manifests'),
  }
});
