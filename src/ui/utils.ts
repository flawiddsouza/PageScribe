import type { PluginManifest, PluginManifestRendererMeta } from 'src/shared/types';
import type { DirectoryItem } from './components/types';

export function findItemByIdInTree(id: string, treeItems: DirectoryItem[]): DirectoryItem | null {
  for (const item of treeItems) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemByIdInTree(id, item.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function findAllAncestorIdsByChildId(tree: DirectoryItem[], childId: string, currentPath: string[] = []): string[] | null {
  for (const node of tree) {
    if (node.id === childId) {
      return currentPath;
    }

    if (node.children) {
      const ancestorsPath = findAllAncestorIdsByChildId(node.children, childId, [...currentPath, node.id]);
      if (ancestorsPath) {
        return ancestorsPath;
      }
    }
  }
  return null;
}

export function flattenTree(treeItems: DirectoryItem[]): DirectoryItem[] {
  const result: DirectoryItem[] = [];
  for (const item of treeItems) {
    result.push(item);
    if (item.children) {
      result.push(...flattenTree(item.children));
    }
  }
  return result;
}

export function getPluginRenderer(pluginManifests: PluginManifest[], metaType: PluginManifestRendererMeta['type'], extension: string) {
  for (const manifest of pluginManifests) {
    for (const contribution of manifest.contributes) {
      if (contribution.type === 'renderer' && contribution.meta.type === metaType && contribution.meta.supportedExtensions.includes(extension)) {
        return {
          folder: manifest.folder,
          ...contribution.meta,
        };
      }
    }
  }

  return null;
}

export function getPluginNewFileContributions(pluginManifests: PluginManifest[]) {
  const newFileContributions = [];

  for (const manifest of pluginManifests) {
    for (const contribution of manifest.contributes) {
      if (contribution.type === 'new_file') {
        newFileContributions.push(contribution.meta);
      }
    }
  }

  return newFileContributions;
}
