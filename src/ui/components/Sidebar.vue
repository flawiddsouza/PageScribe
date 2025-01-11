<template>
  <div
    ref="sidebar"
    class="sidebar"
    tabindex="0"
    :style="{
      '--font-size': fontSize,
      '--hover-color': colors.sidebarItemHoverColor,
      '--active-color': colors.sidebarItemActiveColor,
      '--active-border-color': colors.sidebarItemActiveBorderColor,
      '--border-color': colors.borderColor,
    }"
    @click="deselectAllItems"
    @contextmenu.prevent="handleSidebarRightClick"
  >
    <sidebar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :active-item="activeItem"
      :level="0"
      :collapsed-items="collapsedItems"
      :selected-items="selectedItems"
      :right-clicked-item="rightClickedItem"
      :show-input="showInput"
      @item-clicked="handleItemClick"
      @item-right-clicked="handleItemRightClick"
      @drag-start="(item, ev) => $emit('drag-start', item, ev)"
      @drop="(item, ev) => $emit('drop', item, ev)"
      @collapse="(item, collapse) => $emit('collapse', item, collapse)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, toRaw } from 'vue';
import SidebarItem from './SidebarItem.vue';
import type { DirectoryItem, ShowInput } from './types';

const props = defineProps<{
  items: DirectoryItem[],
  activeItem: DirectoryItem | null,
  collapsedItems: Set<string>,
  fontSize: string,
  colors: {
    sidebarItemHoverColor: string,
    sidebarItemActiveColor: string,
    sidebarItemActiveBorderColor: string,
    borderColor: string,
  },
  showInput: ShowInput | null,
}>();

const sidebarRef = useTemplateRef('sidebar');

const selectedItems = ref<Set<DirectoryItem>>(new Set());
const rightClickedItem = ref<DirectoryItem | null>(null);

const emit = defineEmits(['item-clicked', 'item-right-clicked', 'sidebar-right-clicked', 'drag-start', 'drop', 'collapse']);

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
  border-left-width: 1px;
  border-right-width: 1px;
  font-size: var(--font-size);
  border-right: 1px solid var(--border-color);
}

.sidebar:focus {
  border: 1px solid #3e79ff;
  border-left-width: 1px;
  border-right-width: 1px;
}
</style>
