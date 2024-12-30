<template>
  <nav>
    <button @click="openFolder">Open Folder</button>
  </nav>
</template>

<script setup lang="ts">
async function openFolder() {
  const result = await window.electron.ipcRenderer.invoke('open-folder-dialog');
  if (result && !result.canceled && result.filePaths.length > 0) {
    alert(`Picked folder: ${result.filePaths[0]}`);
  }
}
</script>
