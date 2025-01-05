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

interface Item {
  id: number;
  name: string;
  type: 'folder' | 'file';
  children?: Item[];
}

defineProps<{ items: Item[] }>();

const selectedItems = ref<Set<Item>>(new Set());

const emit = defineEmits(['item-clicked', 'item-right-clicked']);

function handleItemClick(item: Item, event: MouseEvent) {
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

function handleItemRightClick(item: Item, event: MouseEvent) {
  event.preventDefault();
  emit('item-right-clicked', item, event);
}
</script>

<style scoped>
.sidebar {
  height: 100%;
  overflow-y: auto;
  user-select: none;
}
</style>
