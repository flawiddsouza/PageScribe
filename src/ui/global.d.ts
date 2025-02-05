export {};

import type { DirectoryItem, PluginManifest, ReadFileResult, RenameFileOrFolderResult } from './components/types';

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
        renameFile: (basePath: string, oldFilePath: string, newFileName: string) => Promise<RenameFileOrFolderResult>;
        renameFolder: (basePath: string, oldFolderPath: string, newFolderName: string) => Promise<RenameFileOrFolderResult>;
        moveFile: (basePath: string, oldFilePath: string, moveToFolderPath: string) => Promise<void>;
        moveFolder: (basePath: string, oldFolderPath: string, moveToFolderPath: string) => Promise<void>;
        getPluginManifests: () => Promise<PluginManifest[]>;
        revealInFileExplorer: (basePath: string, fileOrFolderPath: string) => Promise<void>;
        // folder config
        getOpenTabs: (folderPath: string) => Promise<{ openTabs: string[], activeTab: string }>;
        saveOpenTabs: (folderPath: string, openTabs: string[], activeTab: string) => Promise<void>;
        getCollapsedFolders: (folderPath: string) => Promise<string[]>;
        saveCollapsedFolders: (folderPath: string, collapsedFolders: string[]) => Promise<void>;
        // events
        onFilesToOpen: (callback: (filesToOpen: DirectoryItem[]) => void) => void;
        onOpenFolder: (callback: (folderPath: string) => void) => void;
        onCloseFolder: (callback: () => void) => void;
      };
    };
  }
}
