export interface DirectoryItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: DirectoryItem[];
}
