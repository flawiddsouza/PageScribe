import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openFolder: () => ipcRenderer.invoke('open-folder'),
    getDirectoryTree: (folderPath: string) => ipcRenderer.invoke('get-directory-tree', folderPath),
    readFile: (filePath: string, basePath: string) => ipcRenderer.invoke('read-file', filePath, basePath)
  }
});
