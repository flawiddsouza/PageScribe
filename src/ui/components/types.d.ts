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
