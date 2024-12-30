<template>
  <h1>💖 Hello!</h1>
  <nav>
    <button @click="createProject">Create Project</button>
    <button @click="createProject">Open Project</button>
  </nav>
</template>

<script setup lang="ts">
async function createProject() {
  const result = await window.electron.ipcRenderer.invoke('open-folder-dialog');
  if (result && !result.canceled && result.filePaths.length > 0) {
    alert(`Picked folder: ${result.filePaths[0]}`);
  }
}
</script>
