export interface DirectoryItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: DirectoryItem[];
}

export interface ShowInput {
  parentId: string;
  type: 'file' | 'folder';
  initialValue: string;
  callback: (success: boolean, value: string) => void;
}

export interface PluginManifest {
  folder: string;
  manifestVersion: number;
  name: string;
  version: string;
  description: string;
  contributes: {
    type: string;
    meta: {
      type: string;
      renderer: string;
      supportedExtensions: string[];
    };
  }[];
}
