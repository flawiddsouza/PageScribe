export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: unknown[]) => Promise<{ canceled: boolean; filePaths: string[] }>;
      };
    };
  }
}
