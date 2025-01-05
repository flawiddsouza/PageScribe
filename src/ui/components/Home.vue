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
          <textarea
            v-model="content"
            style="width: 100%; height: 100%; resize: none; padding: 1rem;"
            spellcheck="false"
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
import 'splitpanes/dist/splitpanes.css';
import Sidebar from './Sidebar.vue';
import * as ipc from '../ipc';
import ContextMenu from '@imengyu/vue3-context-menu';
import type { DirectoryItem, ShowInput } from './types';

const sidebarRef = useTemplateRef('sidebar');
const items = ref<DirectoryItem[]>([]);
const clickedItem = ref<DirectoryItem|null>(null);
const content = ref('');
const showSidebarItemInput = ref<ShowInput | null>(null);

onBeforeMount(async () => {
  const lastOpenedFolder = localStorage.getItem('lastOpenedFolder');
  if (lastOpenedFolder) {
    getDirectoryTree(lastOpenedFolder);
  }
});

function resetView() {
  clickedItem.value = null;
  content.value = '';
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
    const fileContent = await ipc.readFile(filePath, basePath);
    content.value = fileContent;
  } catch (error) {
    content.value = 'Error loading file: ' + error.message;
  }
}

function handleClick(item: DirectoryItem) {
  clickedItem.value = item;
  if (item.type === 'file') {
    loadFile(item.id);
  } else {
    content.value = 'Directory selected. Click on a file to view its content.';
  }
}

function handleRightClick(item: DirectoryItem, event: MouseEvent) {
  let contextMenuItems = [];

  if (item.type === 'folder') {
    contextMenuItems = [
      {
        label: 'New File...',
        onClick() {
          console.log('New File Start', item)
          showSidebarItemInput.value = {
            parentId: item.id,
            type: 'file',
            initialValue: '',
            callback(success: boolean, value: string) {
              if (success && value) {
                const basePath = localStorage.getItem('lastOpenedFolder');
                ipc.createFile(value, item.id, basePath);
                getDirectoryTree(basePath);
              }
              showSidebarItemInput.value = null;
            },
          };
        },
      },
      {
        label: 'New Folder...',
        onClick() {
          console.log('New Folder Start', item)
          showSidebarItemInput.value = {
            parentId: item.id,
            type: 'folder',
            initialValue: '',
            async callback(success: boolean, value: string) {
              if (success && value) {
                const basePath = localStorage.getItem('lastOpenedFolder');
                await ipc.createFolder(value, item.id, basePath);
                getDirectoryTree(basePath);
              }
              showSidebarItemInput.value = null;
            },
          };
        },
      },
      {
        label: 'Delete',
        onClick: () => console.log('Delete', item),
      },
    ];
  } else {
    contextMenuItems = [
      {
        label: 'Delete',
        onClick: () => console.log('Delete', item),
      },
    ];
  }

  ContextMenu.showContextMenu({
    x: event.clientX,
    y: event.clientY,
    items: contextMenuItems,
    preserveIconWidth: false,
    onClose: () => sidebarRef.value.clearRightClickedItem(),
  });
}
</script>
