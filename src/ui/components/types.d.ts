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

export interface ReadFileResult {
  extension: string;
  fileContent: string;
}

export interface PluginManifest {
  folder: string;
  manifestVersion: 1;
  name: string;
  version: string;
  description: string;
  contributes: {
    type: 'renderer';
    meta: {
      type: 'file' | 'folder';
      renderer: string;
      fontHint: 'text' | 'code';
      supportedExtensions: string[];
    };
  }[];
}
