<template>
  <div
    ref="sidebar"
    class="sidebar"
    tabindex="0"
    :style="{
      '--font-size': fontSize,
      '--hover-color': colors.hoverColor,
      '--active-color': colors.activeColor,
      '--active-border-color': colors.activeBorderColor
    }"
    @click="deselectAllItems"
    @contextmenu.prevent="handleSidebarRightClick"
  >
    <sidebar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :level="0"
      :selected-items="selectedItems"
      :right-clicked-item="rightClickedItem"
      :show-input="showInput"
      @item-clicked="handleItemClick"
      @item-right-clicked="handleItemRightClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, toRaw } from 'vue';
import SidebarItem from './SidebarItem.vue';
import type { DirectoryItem, ShowInput } from './types';

const props = defineProps<{
  items: DirectoryItem[],
  fontSize: string,
  colors: {
    hoverColor: string,
    activeColor: string,
    activeBorderColor: string,
  },
  showInput: ShowInput | null,
}>();

const sidebarRef = useTemplateRef('sidebar');

const selectedItems = ref<Set<DirectoryItem>>(new Set());
const rightClickedItem = ref<DirectoryItem | null>(null);

const emit = defineEmits(['item-clicked', 'item-right-clicked', 'sidebar-right-clicked']);

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

function handleSidebarRightClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('sidebar-right-clicked', event);
  }
}

function clearRightClickedItem() {
  rightClickedItem.value = null;
}

function selectAllItems(items: DirectoryItem[]) {
  const allItems = new Set<DirectoryItem>();
  function addItems(itemList: DirectoryItem[]) {
    for (const item of itemList) {
      const itemClone = structuredClone(toRaw(item));
      delete itemClone.children;
      allItems.add(itemClone);
      if (item.children) {
        addItems(item.children);
      }
    }
  }
  addItems(items);
  return allItems;
}

defineExpose({
  clearRightClickedItem,
});

// if focus is within sidebar and I press ctrl + a, select all items
window.addEventListener('keydown', (event) => {
  if (sidebarRef.value && sidebarRef.value.contains(document.activeElement) && event.ctrlKey && event.key.toLowerCase() === 'a') {
    event.preventDefault();
    selectedItems.value = selectAllItems(props.items);
  }
});
</script>

<style scoped>
.sidebar {
  height: 100%;
  overflow-y: auto;
  user-select: none;
  padding-bottom: 2rem;
  border: 1px solid transparent;
  border-left-width: 2px;
  border-right-width: 2px;
  font-size: var(--font-size);
}

.sidebar:focus {
  border: 1px solid #3e79ff;
  border-left-width: 2px;
  border-right-width: 2px;
}
</style>
