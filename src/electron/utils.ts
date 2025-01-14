import { glob } from 'tinyglobby';
import type { DirectoryItem } from '../ui/components/types';
import { PluginManifestSchema } from '../shared/types';
import type { PluginManifest } from '../shared/types';
import fs from 'fs/promises';
import path from 'path';
import { app } from 'electron';

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
        currentDir = existing.children ?? [];
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
  const appPath = MAIN_WINDOW_VITE_DEV_SERVER_URL ? app.getAppPath() : path.join(app.getAppPath(), '..');
  const pluginDir = path.join(appPath, 'plugins');
  const pluginFolders = await fs.readdir(pluginDir);

  const manifests: PluginManifest[] = [];

  for (const folder of pluginFolders) {
    const manifestPath = path.join(pluginDir, folder, 'manifest.json');
    try {
      const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
      try {
        const result = PluginManifestSchema.parse(manifest);
        manifests.push({ ...result, folder });
      } catch (validationError) {
        console.error(`Validation failed for plugin ${folder}:`, validationError);
      }
    } catch (readError) {
      console.error(`Failed to read manifest for plugin ${folder}:`, readError);
    }
  }

  return manifests;
}

export function normalizePath(fileOrFolderPath: string) {
  return fileOrFolderPath.replaceAll(path.win32.sep, path.posix.sep);
}
