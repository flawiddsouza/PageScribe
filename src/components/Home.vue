<template>
  <main style="display: grid; grid-template-rows: 1fr; height: 100dvh;">
    <splitpanes
      class="default-theme"
      style="overflow: auto;"
    >
      <pane
        min-size="15"
        size="15"
      >
        <button @click="openFolder" style="width: 100%;">
          Open Folder
        </button>
        <Sidebar
          :items="items"
          @item-clicked="handleClick"
          @item-right-clicked="handleRightClick"
        />
      </pane>
      <pane
        min-size="15"
        size="85"
      >
        <div>{{ clickedItemName }}</div>
      </pane>
    </splitpanes>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import Sidebar from './Sidebar.vue';

const clickedItemName = ref('');

interface Item {
  id: number;
  name: string;
  type: 'folder' | 'file';
  children?: Item[];
}

const items = ref<Item[]>([]);

onBeforeMount(async () => {
  const lastOpenedFolder = localStorage.getItem('lastOpenedFolder');
  if (lastOpenedFolder) {
    getDirectoryTree(lastOpenedFolder);
  }
});

async function openFolder() {
  const result = await window.electron.ipcRenderer.invoke('open-folder');
  if (result && !result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    localStorage.setItem('lastOpenedFolder', filePath);
    getDirectoryTree(filePath);
  }
}

async function getDirectoryTree(filePath: string) {
  document.title = filePath + ' - StoryScribe';
  const directoryStructure = await window.electron.ipcRenderer.invoke('get-directory-tree', filePath);
  items.value = directoryStructure;
}

function handleClick(itemName: string) {
  clickedItemName.value = itemName;
}

function handleRightClick(item: { name: string }, event: MouseEvent) {
  console.log('handleRightClick', item, event);
}
</script>
