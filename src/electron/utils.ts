import { glob } from 'tinyglobby';
import type { DirectoryItem, PluginManifest } from '../ui/components/types';
import fs from 'fs/promises';
import path from 'path';

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

export async function getPluginManifests() : Promise<PluginManifest[]> {
  const pluginDir = path.join(__dirname, '../../plugins');
  const pluginFolders = await fs.readdir(pluginDir);

  const manifests: PluginManifest[] = [];

  for (const folder of pluginFolders) {
    const manifestPath = path.join(pluginDir, folder, 'manifest.json');
    try {
      const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
      manifests.push({ ...manifest, folder });
    } catch (error) {
      console.error(`Failed to read manifest for plugin ${folder}:`, error);
    }
  }

  return manifests;
}
