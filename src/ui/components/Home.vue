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
          style="width: 100%;"
          @click="openFolder"
        >
          Open Folder
        </button>
        <Sidebar
          ref="sidebar"
          :items="items"
          hover-color="#f0f0f0"
          active-color="#dfeaff"
          active-border-color="#b6d5fb"
          @item-clicked="handleClick"
          @item-right-clicked="handleRightClick"
          :show-input="showSidebarItemInput"
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
          <div ref="renderer" style="height: 100%; overflow: hidden;"></div>
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
import 'splitpanes/dist/splitpanes.css';
import Sidebar from './Sidebar.vue';
import * as ipc from '../ipc';
import ContextMenu from '@imengyu/vue3-context-menu';
import type { DirectoryItem, ShowInput } from './types';

const sidebarRef = useTemplateRef('sidebar');
const rendererRef = useTemplateRef('renderer');
const items = ref<DirectoryItem[]>([]);
const clickedItem = ref<DirectoryItem|null>(null);
const showSidebarItemInput = ref<ShowInput | null>(null);
let rendererInstance: any = null

onBeforeMount(async () => {
  const lastOpenedFolder = localStorage.getItem('lastOpenedFolder');
  if (lastOpenedFolder) {
    getDirectoryTree(lastOpenedFolder);
  }

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

async function loadFile(filePath: string) {
  try {
    const basePath = localStorage.getItem('lastOpenedFolder');
    const fileContent = await ipc.readFile(basePath, filePath);
    rendererRef.value.innerHTML = '';
    const { default: TextRenderer } = await import('../../../plugins/text-renderer/text-renderer.js');
    rendererInstance = new TextRenderer(rendererRef.value, () => saveCurrentlyOpenFile());
    rendererInstance.render(fileContent);
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
    rendererRef.value.innerHTML = 'Directory selected. Click on a file to view its content.';
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
    if (confirm(`Are you sure you want to delete ${item.id}?`)) {
      const deleteMethod = type === 'file' ? ipc.deleteFile : ipc.deleteFolder;
      await deleteMethod(basePath, item.id);
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
        label: 'Delete',
        onClick: () => handleDelete('folder'),
      },
    ];
  } else {
    return [
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
</script>
