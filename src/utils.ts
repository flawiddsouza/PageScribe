import { glob } from 'tinyglobby';

interface DirectoryItem {
  id: string
  name: string;
  type: 'folder' | 'file';
  children?: DirectoryItem[];
}

export async function getDirectoryTree(dir: string): Promise<DirectoryItem[]> {
  const result: DirectoryItem[] = [];
  const files = await glob('**/*', {
    cwd: dir,
    ignore: [
      '.git',
      '.gitignore',
      'node_modules',
    ],
    onlyFiles: false,
  });

  for (const file of files) {
    const parts = file.split('/');
    let currentDir = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const id = parts.slice(0, i + 1).join('/');
      const existing = currentDir.find((item) => item.id === id);
      if (existing) {
        currentDir = existing.children;
      } else {
        const type = i === parts.length - 1 ? 'file' : 'folder';
        const item: DirectoryItem = {
          id,
          name: part,
          type,
        };
        if (type === 'folder') {
          item.children = [];
        }
        currentDir.push(item);
        currentDir = item.children?.filter(item => item.name !== '') || [];
      }
    }
  }

  // Sort folders at the top and then files
  function sortItems(items: DirectoryItem[]): DirectoryItem[] {
    return items.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
      }
      return a.type === 'folder' ? -1 : 1;
    }).map(item => {
      if (item.children) {
        item.children = sortItems(item.children);
      }
      return item;
    });
  }

  return sortItems(result);
}
