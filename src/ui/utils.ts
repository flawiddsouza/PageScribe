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
