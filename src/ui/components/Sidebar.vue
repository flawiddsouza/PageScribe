<template>
  <div
    ref="sidebar"
    class="sidebar"
    tabindex="0"
    @click="deselectAllItems"
  >
    <sidebar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :level="0"
      :selected-items="selectedItems"
      :right-clicked-item="rightClickedItem"
      :hover-color="hoverColor"
      :active-color="activeColor"
      :active-border-color="activeBorderColor"
      @item-clicked="handleItemClick"
      @item-right-clicked="handleItemRightClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, toRaw } from 'vue';
import SidebarItem from './SidebarItem.vue';
import type { DirectoryItem } from './types';

const props = defineProps<{
  items: DirectoryItem[],
  hoverColor: string,
  activeColor: string,
  activeBorderColor: string,
}>();

const sidebarRef = useTemplateRef('sidebar');

const selectedItems = ref<Set<DirectoryItem>>(new Set());
const rightClickedItem = ref<DirectoryItem | null>(null);

const emit = defineEmits(['item-clicked', 'item-right-clicked']);

function handleItemClick(item: DirectoryItem, event: MouseEvent) {
  const itemClone = structuredClone(toRaw(item));
  delete itemClone.children;
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
    emit('item-clicked', item, event);
  }
}

function handleItemRightClick(item: DirectoryItem, event: MouseEvent) {
  event.preventDefault();
  rightClickedItem.value = item;
  emit('item-right-clicked', item, event);
}

function deselectAllItems(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    selectedItems.value.clear();
    (event.target as HTMLElement).focus();
  }
}

function clearRightClickedItem() {
  rightClickedItem.value = null;
}

defineExpose({
  clearRightClickedItem,
});

// if focus is within sidebar and I press ctrl + a, select all items
window.addEventListener('keydown', (event) => {
  if (sidebarRef.value && sidebarRef.value.contains(document.activeElement) && event.ctrlKey && event.key === 'a') {
    event.preventDefault();
    selectedItems.value = new Set(props.items);
  }
});
</script>

<style scoped>
.sidebar {
  height: 100%;
  overflow-y: auto;
  user-select: none;
  padding-bottom: 2rem;
}
</style>
