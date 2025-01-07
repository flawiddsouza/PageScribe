<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{ active: tab === activeTab }"
      @click="emit('tab-clicked', tab)"
      @mousedown.middle.prevent="emit('close-tab', tab)"
    >
      <div>{{ tab.name }}</div>
      <div class="close-btn" @click.stop="emit('close-tab', tab)">
        <i class="codicon codicon-close"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirectoryItem } from './types';

defineProps<{
  tabs: DirectoryItem[];
  activeTab: DirectoryItem | null;
}>();

const emit = defineEmits(['tab-clicked', 'close-tab']);
</script>

<style scoped>
.tabs {
  display: flex;
  background-color: #f3f3f3;
  user-select: none;
}

.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.tab.active {
  background-color: white;
}

.tab:not(.active) {
  background-color: #ececec;
}

.close-btn {
  margin-left: 0.5rem;
  color: #888;
  display: flex;
  align-items: center;
}

.close-btn i {
  padding-top: 2px; /* weird codeicon offset fix */
}

.close-btn i:hover {
  background-color: #ddd;
  border-radius: 0.3rem;
}
</style>
