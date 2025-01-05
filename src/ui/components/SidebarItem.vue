<template>
  <div
    :class="['folder-item', { active: isActive, 'right-clicked': isRightClicked }]"
    :style="{ paddingLeft: `${leftMargin + (level * 20)}px` }"
    @click="handleClick"
    @contextmenu="handleRightClick"
  >
    <i :class="['codicon', item.type === 'folder' ? (isOpen ? 'codicon-chevron-down' : 'codicon-chevron-right') : 'codicon-file', 'icon']" /> {{ item.name }}
  </div>
  <div v-if="item.children && item.type === 'folder' && isOpen">
    <sidebar-item
      v-for="child in item.children"
      :key="child.id"
      :item="child"
      :level="level + 1"
      :selected-items="selectedItems"
      :right-clicked-item="rightClickedItem"
      :hover-color="hoverColor"
      :active-color="activeColor"
      :active-border-color="activeBorderColor"
      @item-clicked="handleChildClick"
      @item-right-clicked="handleChildRightClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import '@vscode/codicons/dist/codicon.css';
import type { DirectoryItem } from './types';

const props = defineProps<{
  item: DirectoryItem,
  level: number,
  selectedItems: Set<DirectoryItem>,
  rightClickedItem: DirectoryItem | null,
  hoverColor: string,
  activeColor: string,
  activeBorderColor: string,
}>();
const emit = defineEmits(['item-clicked', 'item-right-clicked']);
const isOpen = ref(true);
const leftMargin = 20;

const isActive = computed(() => {
  return Array.from(props.selectedItems).some(selectedItem => selectedItem.id === props.item.id);
});

const isRightClicked = computed(() => {
  return props.rightClickedItem?.id === props.item.id;
});

function toggle() {
  isOpen.value = !isOpen.value;
}

function handleChildClick(item: DirectoryItem, event: MouseEvent) {
  emit('item-clicked', item, event);
}

function handleChildRightClick(item: DirectoryItem, event: MouseEvent) {
  emit('item-right-clicked', item, event);
}

function handleClick(event: MouseEvent) {
  emit('item-clicked', props.item, event);
  if (!event.ctrlKey) {
    toggle();
  }
}

function handleRightClick(event: MouseEvent) {
  event.preventDefault();
  emit('item-right-clicked', props.item, event);
}
</script>

<style scoped>
.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  width: 100%;
  border: 2px solid transparent;
}

.folder-item:hover {
  background-color: v-bind(hoverColor);
}

.folder-item.active {
  background-color: v-bind(activeColor);
}

.folder-item.right-clicked {
  border-color: v-bind(activeBorderColor);
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>
