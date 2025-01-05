export {};

import type { DirectoryItem } from './src/ui/components/types';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        openFolder: () => Promise<{ canceled: boolean; filePaths: string[] }>;
        getDirectoryTree: (folderPath: string) => Promise<DirectoryItem[]>;
        readFile: (filePath: string, basePath: string) => Promise<string>;
        createFile: (fileName: string, folderPath: string, basePath: string) => Promise<void>;
        createFolder: (folderName: string, folderPath: string, basePath: string) => Promise<void>;
      };
    };
  }
}
