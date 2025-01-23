import { contextBridge, ipcRenderer } from 'electron';
import type { DirectoryItem } from 'src/ui/components/types';

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
    moveFile: (basePath: string, oldFilePath: string, moveToFolderPath: string) => ipcRenderer.invoke('move-file', basePath, oldFilePath, moveToFolderPath),
    moveFolder: (basePath: string, oldFolderPath: string, moveToFolderPath: string) => ipcRenderer.invoke('move-folder', basePath, oldFolderPath, moveToFolderPath),
    getPluginManifests: () => ipcRenderer.invoke('get-plugin-manifests'),
    revealInFileExplorer: (basePath: string, fileOrFolderPath: string) => ipcRenderer.invoke('reveal-in-file-explorer', basePath, fileOrFolderPath),
    // folder config
    getOpenTabs: (folderPath: string) => ipcRenderer.invoke('get-open-tabs', folderPath),
    saveOpenTabs: (folderPath: string, openTabs: string[], activeTab: string) => ipcRenderer.invoke('save-open-tabs', folderPath, openTabs, activeTab),
    getCollapsedFolders: (folderPath: string) => ipcRenderer.invoke('get-collapsed-folders', folderPath),
    saveCollapsedFolders: (folderPath: string, collapsedFolders: string[]) => ipcRenderer.invoke('save-collapsed-folders', folderPath, collapsedFolders),
    // events
    onFilesToOpen(callback: (filesToOpen: DirectoryItem[]) => void) {
      return ipcRenderer.on('files-to-open', (_, filesToOpen: DirectoryItem[]) => callback(filesToOpen));
    },
    onOpenFolder(callback: (folderPath: string) => void) {
      return ipcRenderer.on('open-folder', (_, folderPath: string) => callback(folderPath));
    },
    onCloseFolder(callback: () => void) {
      return ipcRenderer.on('close-folder', callback);
    },
  }
});
