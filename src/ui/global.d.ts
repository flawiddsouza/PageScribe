export {};

import type { DirectoryItem, PluginManifest, ReadFileResult } from './components/types';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        openFolder: () => Promise<{ canceled: boolean; filePaths: string[] }>;
        getDirectoryTree: (folderPath: string) => Promise<DirectoryItem[]>;
        readFile: (basePath: string, filePath: string) => Promise<ReadFileResult>;
        createFile: (basePath: string, folderPath: string, fileName: string) => Promise<void>;
        createFolder: (basePath: string, folderPath: string, folderName: string) => Promise<void>;
        writeFile: (basePath: string, filePath: string, fileContent: string) => Promise<void>;
        deleteFile: (basePath: string, filePath: string) => Promise<void>;
        deleteFolder: (basePath: string, folderPath: string) => Promise<void>;
        renameFile: (basePath: string, oldFilePath: string, newFileName: string) => Promise<void>;
        renameFolder: (basePath: string, oldFolderPath: string, newFolderName: string) => Promise<void>;
        moveFile: (basePath: string, oldFilePath: string, moveToFolderPath: string) => Promise<void>;
        moveFolder: (basePath: string, oldFolderPath: string, moveToFolderPath: string) => Promise<void>;
        getPluginManifests: () => Promise<PluginManifest[]>;
        revealInFileExplorer: (basePath: string, fileOrFolderPath: string) => Promise<void>;
        getOpenTabs: (folderPath: string) => Promise<{ openTabs: string[], activeTab: string }>;
        saveOpenTabs: (folderPath: string, openTabs: string[], activeTab: string) => Promise<void>;
      };
    };
  }
}
