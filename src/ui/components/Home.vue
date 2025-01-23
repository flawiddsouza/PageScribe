<template>
  <main style="display: grid; grid-template-rows: 1fr; height: 100dvh;">
    <SplitPanes horizontal>
      <Pane
        :flex-grow="paneProportionalWidthLeft"
        min-size="200px"
        style="display: grid; grid-template-rows: auto 1fr;"
        @resized="savePaneProportionalWidthLeft"
      >
        <button
          v-if="!lastOpenedFolder"
          class="button no-radius"
          style="width: 100%;"
          @click="openFolder"
        >
          Open Folder
        </button>
        <Sidebar
          ref="sidebar"
          :items="items"
          :active-item="activeTab"
          :collapsed-items="collapsedSidebarItems"
          font-size="14px"
          :colors="{
            sidebarItemHoverColor: '#f0f0f0',
            sidebarItemActiveColor: '#dfeaff',
            sidebarItemActiveBorderColor: '#b6d5fb',
            borderColor: '#e5e5e5',
          }"
          :show-input="showSidebarItemInput"
          @item-clicked="handleSidebarItemClick"
          @item-right-clicked="handleSidebarItemRightClick"
          @contextmenu.prevent="handleSidebarRightClick"
          @drag-start="handleDragStart"
          @drop="handleDrop"
          @collapse="handleCollapseSidebarItem"
        />
      </Pane>
      <Pane
        :flex-grow="paneProportionalWidthRight"
        :hide-resizer="true"
        @resized="savePaneProportionalWidthRight"
      >
        <div
          v-if="activeTab"
          style="height: 100%; display: grid; grid-template-rows: auto 1fr;"
        >
          <TabBar
            :tabs="tabs"
            :active-tab="activeTab"
            @tab-clicked="handleSidebarItemClick"
            @close-tab="closeTab"
            @reorder-tabs="handleReorderTabs"
          />
          <Tab
            :tab="activeTab"
            :plugin-manifests="pluginManifests"
          />
        </div>
        <div
          v-else
          style="padding: 1rem;"
        >
          Click on a file to view its content.
        </div>
      </Pane>
    </SplitPanes>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, useTemplateRef, watch } from 'vue';
import SplitPanes from './SplitPanes.vue';
import Pane from './Pane.vue';
import Sidebar from './Sidebar.vue';
import Tab from './Tab.vue';
import TabBar from './TabBar.vue';
import * as ipc from '../ipc';
import ContextMenu, { MenuItem } from '@imengyu/vue3-context-menu';
import smalltalk from 'smalltalk';

import type { DirectoryItem, ShowInput } from './types';
import type { PluginManifest } from '../../../src/shared/types';
import { findAllAncestorIdsByChildId, findItemByIdInTree, flattenTree, getPluginNewFileContributions } from '../utils';

const sidebarRef = useTemplateRef('sidebar');
const items = ref<DirectoryItem[]>([]);
const showSidebarItemInput = ref<ShowInput | null>(null);
let pluginManifests: PluginManifest[] = [];
const tabs = ref<DirectoryItem[]>([]);
const activeTab = ref<DirectoryItem | null>(null);
const draggedItem = ref<DirectoryItem | null>(null);
const collapsedSidebarItems = ref<Set<string>>(new Set());
const paneProportionalWidthLeft = ref(0.13);
const paneProportionalWidthRight = ref(1);
const lastOpenedFolder = ref<string | null>(null);
const filesToOpen = ref<DirectoryItem[]>([]);
const initAlreadyCompleted = ref(false);

onBeforeMount(async () => {
  ipc.onFilesToOpen((files) => {
    filesToOpen.value = files;
    if (initAlreadyCompleted.value) {
      files.forEach((file) => {
        handleSidebarItemClick(file);
      });
    }
  });

  ipc.onOpenFolder((folderPath) => {
    openFolderBase(folderPath);
  });

  ipc.onCloseFolder(() => {
    resetView();
  });

  pluginManifests = await ipc.getPluginManifests();

  const savedPaneProportionalWidthLeft = localStorage.getItem('paneProportionalWidthLeft');
  if (savedPaneProportionalWidthLeft) {
    paneProportionalWidthLeft.value = parseFloat(savedPaneProportionalWidthLeft);
  }

  const savedPaneProportionalWidthRight = localStorage.getItem('paneProportionalWidthRight');
  if (savedPaneProportionalWidthRight) {
    paneProportionalWidthRight.value = parseFloat(savedPaneProportionalWidthRight);
  }

  lastOpenedFolder.value = localStorage.getItem('lastOpenedFolder');

  if (lastOpenedFolder.value) {
    await loadFolder(lastOpenedFolder.value);
  }

  filesToOpen.value.forEach((file) => {
    handleSidebarItemClick(file);
  });

  initAlreadyCompleted.value = true;
});

watch(() => activeTab.value, (newActiveTab) => {
  if (newActiveTab) {
    // expand all ancestors of the active tab in the sidebar
    const ancestorIds = findAllAncestorIdsByChildId(items.value, newActiveTab.id);
    ancestorIds?.forEach((ancestorId) => collapsedSidebarItems.value.delete(ancestorId));
  }
});

function resetView() {
  items.value = [];
  tabs.value = [];
  activeTab.value = null;
  lastOpenedFolder.value = null;
  localStorage.removeItem('lastOpenedFolder');
}

async function openFolderBase(folderPath: string) {
  resetView();
  await loadFolder(folderPath);
}

async function openFolder() {
  const folderPath = await ipc.openFolder();
  if (folderPath !== null) {
    await openFolderBase(folderPath);
  }
}

async function loadFolder(folderPath: string) {
  lastOpenedFolder.value = folderPath;
  localStorage.setItem('lastOpenedFolder', folderPath);

  await getDirectoryTree(folderPath);

  const collapsedFolders = await ipc.getCollapsedFolders(folderPath);
  collapsedSidebarItems.value = new Set(collapsedFolders);

  const { openTabs, activeTab: savedActiveTab } = await ipc.getOpenTabs(folderPath);
  tabs.value = openTabs.map(tabId => findItemByIdInTree(tabId, items.value)).filter(Boolean) as DirectoryItem[];
  activeTab.value = findItemByIdInTree(savedActiveTab, items.value) || null;
}

async function getDirectoryTree(filePath: string) {
  document.title = filePath + ' - PageScribe';
  const directoryStructure = await ipc.getDirectoryTree(filePath);
  items.value = directoryStructure;
}

function handleSidebarItemClick(item: DirectoryItem) {
  if (tabs.value.find((tab) => tab.id === item.id) === undefined) {
    tabs.value.push(item);
  }
  activeTab.value = item;
  sidebarRef.value?.deselectAllItems();
  saveOpenTabs();
}

function createContextMenuItems(item: DirectoryItem): MenuItem[] {
  const basePath = lastOpenedFolder.value;

  if (!basePath) {
    throw new Error('basePath is null when it\'s not supposed to be - should not happen');
  }

  const handleCallback = async (success: boolean, value: string, type: 'file' | 'folder', extension?: string) => {
    if (success && value) {
      const name = value + (extension ? extension : '');

      const createMethod = type === 'file' ? ipc.createFile : ipc.createFolder;
      await createMethod(basePath, item.id, name);
      await getDirectoryTree(basePath);

      if (type === 'file') {
        const newItemId = item.id + '/' + name;
        const newItem = findItemByIdInTree(newItemId, items.value);
        if (newItem) {
          handleSidebarItemClick(newItem);
        }
      }
    }
    showSidebarItemInput.value = null;
  };

  const handleDelete = async (type: 'file' | 'folder') => {
    let message = `Are you sure you want to delete "${item.name}"`;

    if (type === 'folder') {
      message += ' and its contents';
    }

    message += '?';

    const confirmed = await smalltalk.confirm(`Delete ${type}`, message).then(() => true).catch(() => false);
    if (confirmed) {
      const deleteMethod = type === 'file' ? ipc.deleteFile : ipc.deleteFolder;
      await deleteMethod(basePath, item.id);

      // deleting a file / folder should close the open tab related to it
      if (tabs.value.some((tab) => tab.id === item.id)) {
        closeTab(item);
      }

      // deleting a parent / grand parent folder should close the open files / folders that come under it
      if (item.type === 'folder') {
        const itemInTree = findItemByIdInTree(item.id, items.value);
        if (itemInTree?.children) {
          const flattenedTree = flattenTree(itemInTree?.children);
          const tabsToClose = tabs.value.filter((tab) => flattenedTree.some((treeItem) => treeItem.id === tab.id));
          tabsToClose.forEach((tab) => closeTab(tab));
        }
      }

      // reload the directory tree
      getDirectoryTree(basePath);
    }
  };

  const handleRename = async (type: 'file' | 'folder') => {
    const newName = await smalltalk.prompt(`Rename ${type}`, `Enter new name for ${item.name}:`, item.name).catch(() => null);
    if (newName) {
      const renameMethod = type === 'file' ? ipc.renameFile : ipc.renameFolder;
      const oldIdNewIdMap = await renameMethod(basePath, item.id, newName);
      getDirectoryTree(basePath);

      // Remap activeTab, tabs, and collapsedSidebarItems
      oldIdNewIdMap.forEach(({ oldId, newId }, index) => {
        if (activeTab.value?.id === oldId) {
          activeTab.value.id = newId;
          // first item is the renamed item
          if (index === 0) {
            activeTab.value.name = newName;
          }
        }

        tabs.value = tabs.value.map(tab => {
          if (tab.id === oldId) {
            tab.id = newId;
            // first item is the renamed item
            if (index === 0) {
              tab.name = newName;
            }
          }
          return tab;
        });

        if (collapsedSidebarItems.value.has(oldId)) {
          collapsedSidebarItems.value.delete(oldId);
          collapsedSidebarItems.value.add(newId);
        }
      });

      saveOpenTabs();
    }
  };

  const handleReveal = async () => {
    await ipc.revealInFileExplorer(basePath, item.id);
  };

  if (item.type === 'folder') {
    const newFileContributions = getPluginNewFileContributions(pluginManifests);

    const newFileSubMenu = newFileContributions.map((contribution) => {
      return {
        label: contribution.label,
        onClick() {
          showSidebarItemInput.value = {
            parentId: item.id,
            type: 'file',
            initialValue: contribution.label,
            callback: (success, value) => handleCallback(success, value, 'file', contribution.extension),
          };
        },
      };
    });

    newFileSubMenu.splice(0, 0, {
      label: 'New File',
      onClick() {
        showSidebarItemInput.value = {
          parentId: item.id,
          type: 'file',
          initialValue: '',
          callback: (success, value) => handleCallback(success, value, 'file'),
        };
      },
    });

    return [
      {
        label: 'New File...',
        children: newFileSubMenu,
      },
      {
        label: 'New Folder...',
        onClick() {
          showSidebarItemInput.value = {
            parentId: item.id,
            type: 'folder',
            initialValue: '',
            callback: (success, value) => handleCallback(success, value, 'folder'),
          };
        },
      },
      {
        label: 'Reveal in File Explorer',
        onClick: handleReveal,
      },
      { divided: 'self' },
      {
        label: 'Rename',
        onClick: () => handleRename('folder'),
      },
      {
        label: 'Delete',
        onClick: () => handleDelete('folder'),
      },
    ];
  } else {
    return [
      {
        label: 'Reveal in File Explorer',
        onClick: handleReveal,
      },
      { divided: 'self' },
      {
        label: 'Rename',
        onClick: () => handleRename('file'),
      },
      {
        label: 'Delete',
        onClick: () => handleDelete('file'),
      },
    ];
  }
}

function handleSidebarItemRightClick(item: DirectoryItem, event: MouseEvent) {
  const contextMenuItems = createContextMenuItems(item);
  ContextMenu.showContextMenu({
    x: event.clientX,
    y: event.clientY,
    items: contextMenuItems,
    preserveIconWidth: false,
    onClose: () => sidebarRef.value?.clearRightClickedItem(),
  });
}

function handleSidebarRightClick(event: MouseEvent) {
  const basePath = lastOpenedFolder.value;

  if (!basePath) {
    throw new Error('basePath is null when it\'s not supposed to be - should not happen');
  }

  const handleCallback = async (success: boolean, value: string, type: 'file' | 'folder') => {
    if (success && value) {
      const createMethod = type === 'file' ? ipc.createFile : ipc.createFolder;
      await createMethod(basePath, '', value);
      await getDirectoryTree(basePath);

      if (type === 'file') {
        const newItemId = value;
        const newItem = findItemByIdInTree(newItemId, items.value);
        if (newItem) {
          handleSidebarItemClick(newItem);
        }
      }
    }
    showSidebarItemInput.value = null;

    const emptyItemIndex = items.value.findIndex((item) => item.id === '');
    if (emptyItemIndex !== -1) {
      items.value.splice(emptyItemIndex, 1);
    }
  };

  const handleReveal = async () => {
    await ipc.revealInFileExplorer(basePath, '');
  };

  const contextMenuItems = [
    {
      label: 'New File...',
      onClick() {
        showSidebarItemInput.value = {
          parentId: '',
          type: 'file',
          initialValue: '',
          callback: (success, value) => handleCallback(success, value, 'file'),
        };

        const lastFolderIndex = items.value.findLastIndex((item) => item.type === 'folder');

        items.value.splice(lastFolderIndex + 1, 0, {
          id: '',
          name: '',
          type: 'file'
        });
      },
    },
    {
      label: 'New Folder...',
      onClick() {
        showSidebarItemInput.value = {
          parentId: '',
          type: 'folder',
          initialValue: '',
          callback: (success, value) => handleCallback(success, value, 'folder'),
        };

        items.value.splice(0, 0, {
          id: '',
          name: '',
          type: 'folder'
        });
      },
    },
    {
      label: 'Reveal in File Explorer',
      onClick: handleReveal,
    },
  ];

  ContextMenu.showContextMenu({
    x: event.clientX,
    y: event.clientY,
    items: contextMenuItems,
    preserveIconWidth: false,
  });
}

function closeTab(item: DirectoryItem) {
  const index = tabs.value.findIndex((tab) => tab.id === item.id);
  if (index !== -1) {
    tabs.value.splice(index, 1);
  }

  if (activeTab.value?.id === item.id) {
    activeTab.value = tabs.value[index] ?? tabs.value[index - 1] ?? null;
    sidebarRef.value?.deselectAllItems();
  }

  saveOpenTabs();
}

function handleReorderTabs({ from, to }: { from: number; to: number }) {
  const movedTab = tabs.value.splice(from, 1)[0];
  tabs.value.splice(to, 0, movedTab);
}

function handleDragStart(item: DirectoryItem) {
  draggedItem.value = item;
}

async function handleDrop(item: DirectoryItem) {
  if (!draggedItem.value) return;

  // disallow dropping a file / folder onto a file
  if (item.type === 'file') return;

  // disallow dropping a folder onto itself
  if (draggedItem.value.id !== item.id) {
    const basePath = lastOpenedFolder.value;
    if (!basePath) return;

    const mover = draggedItem.value.type === 'file' ? ipc.moveFile : ipc.moveFolder;
    await mover(basePath, draggedItem.value.id, item.type === 'folder' ? item.id : '');
    getDirectoryTree(basePath);
  }

  draggedItem.value = null;
}

function handleCollapseSidebarItem(item: DirectoryItem, collapsed: boolean) {
  if (item.type === 'file') {
    return;
  }

  if (collapsed) {
    collapsedSidebarItems.value.add(item.id);
  } else {
    collapsedSidebarItems.value.delete(item.id);
  }
  saveCollapsedSidebarItems();
}

function saveOpenTabs() {
  const folderPath = lastOpenedFolder.value;
  if (folderPath) {
    ipc.saveOpenTabs(folderPath, tabs.value.map(tab => tab.id), activeTab.value?.id ?? '');
  }
}

function saveCollapsedSidebarItems() {
  const folderPath = lastOpenedFolder.value;
  if (folderPath) {
    ipc.saveCollapsedFolders(folderPath, Array.from(collapsedSidebarItems.value));
  }
}

function savePaneProportionalWidthLeft(width: number) {
  localStorage.setItem('paneProportionalWidthLeft', width.toString());
}

function savePaneProportionalWidthRight(width: number) {
  localStorage.setItem('paneProportionalWidthRight', width.toString());
}
</script>
