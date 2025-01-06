<template>
  <div
    tabindex="0"
    :class="['folder-item', { active: isActive, 'right-clicked': isRightClicked }]"
    :style="{ paddingLeft: `${leftMargin + (level * 20)}px` }"
    @click="handleClick"
    @contextmenu.stop="handleRightClick"
  >
    <i :class="['codicon', item.type === 'folder' ? (isOpen ? 'codicon-chevron-down' : 'codicon-chevron-right') : 'codicon-file', 'icon']" /> {{ item.name }}
  </div>
  <div class="folder-item" v-if="showInput && item.id === showInput.parentId" :style="{ paddingLeft: `${leftMargin + ((level + 1) * 20)}px` }">
    <i :class="['codicon', showInput.type === 'folder' ? 'codicon-chevron-right' : 'codicon-file', 'icon']" />
    <input
      type="text"
      :value="showInput.initialValue"
      @keyup.enter="(event) => showInput.callback(true, (event.target as HTMLInputElement).value)"
      @keyup.escape="() => showInput.callback(false, '')"
      @blur="(event) => showInput && showInput.callback(true, (event.target as HTMLInputElement).value)"
      placeholder="Enter name"
      v-focus
    >
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
      :show-input="showInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import '@vscode/codicons/dist/codicon.css';
import type { DirectoryItem, ShowInput } from './types';

const props = defineProps<{
  item: DirectoryItem,
  level: number,
  selectedItems: Set<DirectoryItem>,
  rightClickedItem: DirectoryItem | null,
  hoverColor: string,
  activeColor: string,
  activeBorderColor: string,
  showInput: ShowInput | null,
}>();

const emit = defineEmits(['item-clicked', 'item-right-clicked']);

const leftMargin = 20;

const isOpen = ref(true);

const isActive = computed(() => {
  return Array.from(props.selectedItems).some(selectedItem => selectedItem.id === props.item.id);
});

const isRightClicked = computed(() => {
  return props.rightClickedItem?.id === props.item.id;
});

// auto open folder when input is shown
watch(() => props.showInput, (showInput) => {
  if (showInput && showInput.parentId === props.item.id) {
    isOpen.value = true;
  }
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

const vFocus = {
  mounted(element: HTMLElement) {
    element.focus();
  }
};
</script>

<style scoped>
.folder-item {
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  border: 2px solid transparent;
}

.folder-item:hover:not(input) {
  cursor: pointer;
  background-color: v-bind(hoverColor);
}

.folder-item.active:not(input) {
  background-color: v-bind(activeColor);
}

.folder-item.right-clicked {
  border-color: v-bind(activeBorderColor);
}

.folder-item input {
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  font: inherit;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>
