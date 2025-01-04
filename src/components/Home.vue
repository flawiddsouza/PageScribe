<template>
  <main style="display: grid; grid-template-rows: 1fr; height: 100dvh;">
    <splitpanes class="default-theme">
      <pane min-size="15" size="15">
        <div>
          <button @click="openFolder">Open Folder</button>
          <Sidebar @item-clicked="displayItemName" />
        </div>
      </pane>
      <pane min-size="15" size="85">
        <div>{{ clickedItemName }}</div>
      </pane>
    </splitpanes>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import Sidebar from './Sidebar.vue';

const clickedItemName = ref('');

async function openFolder() {
  const result = await window.electron.ipcRenderer.invoke('open-folder-dialog');
  if (result && !result.canceled && result.filePaths.length > 0) {
    alert(`Picked folder: ${result.filePaths[0]}`);
  }
}

function displayItemName(itemName: string) {
  clickedItemName.value = itemName;
}
</script>
