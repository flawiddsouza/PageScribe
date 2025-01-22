<template>
  <div
    ref="renderer"
    style="height: 100%; overflow: hidden;"
  />
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, onBeforeUnmount, useTemplateRef, watch } from 'vue';
import * as ipc from '../ipc';
import type { DirectoryItem } from './types';
import type { PluginManifest } from '../../../src/shared/types';
import { getPluginRenderer } from '../utils';

const props = defineProps<{
  tab: DirectoryItem;
  pluginManifests: PluginManifest[];
}>();

const rendererRef = useTemplateRef('renderer');

let rendererInstance: {
  render: () => void;
  getFileContent: () => string;
};

async function renderFile() {
  const basePath = props.tab.basePath ? props.tab.basePath : localStorage.getItem('lastOpenedFolder');

  if (!basePath) {
    throw new Error('basePath is null when it\'s not supposed to be - should not happen');
  }

  const readFileResult = await ipc.readFile(basePath, props.tab.id);

  let pluginRenderer = getPluginRenderer(props.pluginManifests, 'file', readFileResult.extension);

  if (!rendererRef.value) {
    throw new Error('rendererRef not available - should not happen');
  }

  if (pluginRenderer) {
    rendererRef.value.innerHTML = '';

    // load stylesheet from plugin
    const mountPoint = document.createElement('div');
    mountPoint.style.height = '100%';
    rendererRef.value.appendChild(mountPoint);

    if (pluginRenderer.stylesheet) {
      const existingStylesheet = document.getElementById('plugin-stylesheet');

      if (existingStylesheet) {
        existingStylesheet.remove();
      }

      const stylesheet = document.createElement('link');
      stylesheet.id = 'plugin-stylesheet';
      stylesheet.rel = 'stylesheet';
      stylesheet.href = `plugins://${pluginRenderer.folder}/${pluginRenderer.stylesheet}`;
      document.head.appendChild(stylesheet);
    }

    const { default: Renderer } = await import(/* @vite-ignore */ `plugins://${pluginRenderer.folder}/${pluginRenderer.renderer}`);

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
      fileExtension: readFileResult.extension,
      fileContent: readFileResult.fileContent,
    });
    rendererInstance.render();
  } else {
    rendererRef.value.innerHTML = '<div style="padding: 1rem;">No renderer found for this file type.</div>';
  }
}

async function saveCurrentlyOpenFile() {
  if (!props.tab) {
    throw new Error('clickedItem.value is null when it\'s not supposed to be - should not happen');
  }

  try {
    const basePath = props.tab.basePath ? props.tab.basePath : localStorage.getItem('lastOpenedFolder');

    if (!basePath) {
      throw new Error('basePath is null when it\'s not supposed to be - should not happen');
    }

    await ipc.writeFile(basePath, props.tab.id, rendererInstance.getFileContent());
  } catch (error) {
    const err = error as Error;
    alert('Error saving file: ' + err.message);
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key.toLowerCase() === 's') {
    event.preventDefault();
    if (props.tab) {
      saveCurrentlyOpenFile();
    }
  }
}

function renderTab() {
  if (props.tab.type === 'folder') {
    nextTick(() => {
      if (!rendererRef.value) {
        throw new Error('rendererRef not available - should not happen');
      }

      rendererRef.value.innerHTML = '<div style="padding: 1rem;">Directory selected. Click on a file to view its content.</div>';
    });
  }

  if (props.tab.type === 'file') {
    renderFile();
  }
}

watch(() => props.tab, () => {
  renderTab();
});

onBeforeMount(() => {
  window.addEventListener('keydown', handleKeyDown);
  renderTab();
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
