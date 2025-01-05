<template>
  <div class="sidebar">
    <sidebar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :level="0"
      :selected-items="selectedItems"
      @item-clicked="handleItemClick"
      @item-right-clicked="handleItemRightClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarItem from './SidebarItem.vue';
import type { DirectoryItem } from './types';

defineProps<{ items: DirectoryItem[] }>();

const selectedItems = ref<Set<DirectoryItem>>(new Set());

const emit = defineEmits(['item-clicked', 'item-right-clicked']);

function handleItemClick(item: DirectoryItem, event: MouseEvent) {
  if (event.ctrlKey) {
    if (selectedItems.value.has(item)) {
      selectedItems.value.delete(item);
    } else {
      selectedItems.value.add(item);
    }
  } else {
    // Deselect all items
    selectedItems.value.clear();
    selectedItems.value.add(item);
  }
  emit('item-clicked', item, event);
}

function handleItemRightClick(item: DirectoryItem, event: MouseEvent) {
  event.preventDefault();
  emit('item-right-clicked', item, event);
}
</script>

<style scoped>
.sidebar {
  height: 100%;
  overflow-y: auto;
  user-select: none;
  padding-bottom: 2rem;
}
</style>
