<template>
  <main style="display: grid; grid-template-rows: 1fr; height: 100dvh;">
    <splitpanes
      class="default-theme"
      style="overflow: auto;"
    >
      <pane
        min-size="15"
        size="15"
        style="display: grid; grid-template-rows: auto 1fr;"
      >
        <button
          class="no-radius"
          style="width: 100%;"
          @click="openFolder"
        >
          Open Folder
        </button>
        <Sidebar
          ref="sidebar"
          :items="items"
          font-size="14px"
          :colors="{
            hoverColor: '#f0f0f0',
            activeColor: '#dfeaff',
            activeBorderColor: '#b6d5fb',
          }"
          :show-input="showSidebarItemInput"
          @item-clicked="handleClick"
          @item-right-clicked="handleRightClick"
          @contextmenu.prevent="handleSidebarRightClick"
        />
      </pane>
      <pane
        min-size="15"
        size="85"
      >
        <div
          v-if="clickedItem"
          style="height: 100%; display: grid; grid-template-rows: auto 1fr;"
        >
          <div>{{ clickedItem.id }}</div>
          <Tab
            :tab="clickedItem"
            :plugin-manifests="pluginManifests"
          />
        </div>
        <div v-else>
          <p>Click on a file to view its content.</p>
        </div>
      </pane>
    </splitpanes>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, useTemplateRef } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import Sidebar from './Sidebar.vue';
import Tab from './Tab.vue';
import * as ipc from '../ipc';
import ContextMenu, { MenuItem } from '@imengyu/vue3-context-menu';
import smalltalk from 'smalltalk';

import type { DirectoryItem, ShowInput } from './types';
import { PluginManifest } from '../../../src/shared/types';

const sidebarRef = useTemplateRef('sidebar');
const items = ref<DirectoryItem[]>([]);
const clickedItem = ref<DirectoryItem|null>(null);
const showSidebarItemInput = ref<ShowInput | null>(null);
let pluginManifests: PluginManifest[] = [];

onBeforeMount(async () => {
  const lastOpenedFolder = localStorage.getItem('lastOpenedFolder');
  if (lastOpenedFolder) {
    getDirectoryTree(lastOpenedFolder);
  }

  pluginManifests = await ipc.getPluginManifests();
});

function resetView() {
  clickedItem.value = null;
  items.value = [];
}

async function openFolder() {
  const folderPath = await ipc.openFolder();
  if (folderPath !== null) {
    resetView();
    localStorage.setItem('lastOpenedFolder', folderPath);
    getDirectoryTree(folderPath);
  }
}

async function getDirectoryTree(filePath: string) {
  document.title = filePath + ' - StoryScribe';
  const directoryStructure = await ipc.getDirectoryTree(filePath);
  items.value = directoryStructure;
}

function handleClick(item: DirectoryItem) {
  clickedItem.value = item;
}

function createContextMenuItems(item: DirectoryItem): MenuItem[] {
  const basePath = localStorage.getItem('lastOpenedFolder');

  if (!basePath) {
    throw new Error('basePath is null when it\'s not supposed to be - should not happen');
  }

  const handleCallback = async (success: boolean, value: string, type: 'file' | 'folder') => {
    if (success && value) {
      const createMethod = type === 'file' ? ipc.createFile : ipc.createFolder;
      await createMethod(basePath, item.id, value);
      getDirectoryTree(basePath);
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
      getDirectoryTree(basePath);
    }
  };

  const handleRename = async (type: 'file' | 'folder') => {
    const newName = await smalltalk.prompt(`Rename ${type}`, `Enter new name for ${item.name}:`, item.name).catch(() => null);
    if (newName) {
      const renameMethod = type === 'file' ? ipc.renameFile : ipc.renameFolder;
      await renameMethod(basePath, item.id, newName);
      getDirectoryTree(basePath);
    }
  };

  const handleReveal = async () => {
    await ipc.revealInFileExplorer(basePath, item.id);
  };

  if (item.type === 'folder') {
    return [
      {
        label: 'New File...',
        onClick() {
          showSidebarItemInput.value = {
            parentId: item.id,
            type: 'file',
            initialValue: '',
            callback: (success, value) => handleCallback(success, value, 'file'),
          };
        },
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

function handleRightClick(item: DirectoryItem, event: MouseEvent) {
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
  const basePath = localStorage.getItem('lastOpenedFolder');

  if (!basePath) {
    throw new Error('basePath is null when it\'s not supposed to be - should not happen');
  }

  const handleCallback = async (success: boolean, value: string, type: 'file' | 'folder') => {
    if (success && value) {
      const createMethod = type === 'file' ? ipc.createFile : ipc.createFolder;
      await createMethod(basePath, '', value);
      getDirectoryTree(basePath);
    }
    showSidebarItemInput.value = null;
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
</script>
