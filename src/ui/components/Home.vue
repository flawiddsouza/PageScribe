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
          <div
            ref="renderer"
            style="height: 100%; overflow: hidden;"
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
import { nextTick, onBeforeMount, ref, useTemplateRef } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import Sidebar from './Sidebar.vue';
import * as ipc from '../ipc';
import ContextMenu from '@imengyu/vue3-context-menu';
import smalltalk from 'smalltalk';

import type { DirectoryItem, ShowInput } from './types';
import { PluginManifest } from 'src/shared/types';

const sidebarRef = useTemplateRef('sidebar');
const rendererRef = useTemplateRef('renderer');
const items = ref<DirectoryItem[]>([]);
const clickedItem = ref<DirectoryItem|null>(null);
const showSidebarItemInput = ref<ShowInput | null>(null);
let rendererInstance: {
  render: (content: string) => void;
  getFileContent: () => string;
} = null;
let pluginManifests: PluginManifest[] = [];

onBeforeMount(async () => {
  const lastOpenedFolder = localStorage.getItem('lastOpenedFolder');
  if (lastOpenedFolder) {
    getDirectoryTree(lastOpenedFolder);
  }

  pluginManifests = await ipc.getPluginManifests();

  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      if (clickedItem.value) {
        saveCurrentlyOpenFile();
      }
    }
  });
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

function getPluginRenderer(type: 'renderer', metaType: 'file' | 'folder', extension: string) {
  for (const manifest of pluginManifests) {
    for (const contribution of manifest.contributes) {
      if (contribution.type === type && contribution.meta.type === metaType && contribution.meta.supportedExtensions.includes(extension)) {
        return {
          folder: manifest.folder,
          ...contribution.meta,
        };
      }
    }
  }

  return null;
}

async function loadFile(filePath: string) {
  try {
    const basePath = localStorage.getItem('lastOpenedFolder');
    const readFileResult = await ipc.readFile(basePath, filePath);

    let pluginRenderer = getPluginRenderer('renderer', 'file', readFileResult.extension);

    if (pluginRenderer) {
      rendererRef.value.innerHTML = '';
      const mountPoint = document.createElement('div');
      mountPoint.style.height = '100%';
      rendererRef.value.appendChild(mountPoint);
      const { default: Renderer } = await import(/* @vite-ignore */ `../../../plugins/${pluginRenderer.folder}/${pluginRenderer.renderer}`);

      let fontFamily = '';
      let fontSize = '';

      if (pluginRenderer.fontHint === 'code') {
        fontFamily = 'Consolas, "Courier New", monospace';
        fontSize = '14px';
      }

      if (pluginRenderer.fontHint === 'text') {
        fontFamily = 'Arial, sans-serif';
        fontSize = '16px';
      }

      rendererInstance = new Renderer({
        mountPoint,
        onUpdateCallback: () => saveCurrentlyOpenFile(),
        fontFamily,
        fontSize,
      });
      rendererInstance.render(readFileResult.fileContent);
    } else {
      rendererRef.value.innerHTML = 'No renderer found for this file type.';
    }
  } catch (error) {
    rendererRef.value.innerHTML = 'Error loading file: ' + error.message;
  }
}

async function saveCurrentlyOpenFile() {
  try {
    const basePath = localStorage.getItem('lastOpenedFolder');
    await ipc.writeFile(basePath, clickedItem.value.id, rendererInstance.getFileContent());
  } catch (error) {
    alert('Error saving file: ' + error.message);
  }
}

function handleClick(item: DirectoryItem) {
  clickedItem.value = item;
  if (item.type === 'file') {
    loadFile(item.id);
  } else {
    nextTick(() => {
      rendererRef.value.innerHTML = 'Directory selected. Click on a file to view its content.';
    });
  }
}

function createContextMenuItems(item: DirectoryItem) {
  const basePath = localStorage.getItem('lastOpenedFolder');

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
    onClose: () => sidebarRef.value.clearRightClickedItem(),
  });
}

function handleSidebarRightClick(event: MouseEvent) {
  const basePath = localStorage.getItem('lastOpenedFolder');

  const handleCallback = async (success: boolean, value: string, type: 'file' | 'folder') => {
    if (success && value) {
      const createMethod = type === 'file' ? ipc.createFile : ipc.createFolder;
      await createMethod(basePath, '', value);
      getDirectoryTree(basePath);
    }
    showSidebarItemInput.value = null;
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
  ];

  ContextMenu.showContextMenu({
    x: event.clientX,
    y: event.clientY,
    items: contextMenuItems,
    preserveIconWidth: false,
  });
}
</script>
