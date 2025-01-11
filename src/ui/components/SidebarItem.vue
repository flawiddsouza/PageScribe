<template>
  <div
    v-if="item.id !== ''"
    ref="item"
    tabindex="0"
    :class="['folder-item', { active: isActive, 'right-clicked': isRightClicked, 'drop-target': isDragOver }]"
    :style="{ paddingLeft: `${leftMargin + (level * 20)}px` }"
    draggable="true"
    @click="handleClick"
    @contextmenu.stop="handleRightClick"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="onDrop"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <i :class="['codicon', item.type === 'folder' ? (!collapsedItems.has(item.id) ? 'codicon-chevron-down' : 'codicon-chevron-right') : 'codicon-file', 'icon']" /> {{ item.name }}
  </div>
  <div
    v-if="showInput && (item.id === showInput.parentId || item.id === '')"
    class="folder-item"
    :style="{ paddingLeft: `${leftMargin + ((level + (item.id !== '' ? 1 : 0)) * 20)}px` }"
  >
    <i :class="['codicon', showInput.type === 'folder' ? 'codicon-chevron-right' : 'codicon-file', 'icon']" />
    <input
      v-focus
      type="text"
      :value="showInput.initialValue"
      placeholder="Enter name"
      @keyup.enter="(event) => showInput?.callback(true, (event.target as HTMLInputElement).value)"
      @keyup.escape="() => showInput?.callback(false, '')"
      @blur="(event) => showInput && showInput.callback(true, (event.target as HTMLInputElement).value)"
    >
  </div>
  <div v-if="item.children && item.type === 'folder' && !collapsedItems.has(item.id)">
    <sidebar-item
      v-for="child in item.children"
      :key="child.id"
      :item="child"
      :active-item="activeItem"
      :level="level + 1"
      :collapsed-items="collapsedItems"
      :selected-items="selectedItems"
      :right-clicked-item="rightClickedItem"
      :show-input="showInput"
      @item-clicked="handleChildClick"
      @item-right-clicked="handleChildRightClick"
      @drag-start="onDragStartNested"
      @drop="onDropNested"
      @collapse="handleCollapse"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, computed, watch } from 'vue';
import '@vscode/codicons/dist/codicon.css';
import type { DirectoryItem, ShowInput } from './types';

const props = defineProps<{
  item: DirectoryItem,
  activeItem: DirectoryItem | null,
  level: number,
  collapsedItems: Set<string>,
  selectedItems: Set<DirectoryItem>,
  rightClickedItem: DirectoryItem | null,
  showInput: ShowInput | null,
}>();

const emit = defineEmits(['item-clicked', 'item-right-clicked', 'drag-start', 'drop', 'collapse']);

const leftMargin = 14;

const isDragOver = ref(false);

const itemRef = useTemplateRef('item');

const isActive = computed(() => {
  return Array.from(props.selectedItems).some(selectedItem => selectedItem.id === props.item.id) || props.activeItem?.id === props.item.id;
});

const isRightClicked = computed(() => {
  return props.rightClickedItem?.id === props.item.id;
});

// auto open folder when input is shown
watch(() => props.showInput, (showInput) => {
  if (showInput && showInput.parentId === props.item.id) {
    emit('collapse', props.item, false);
  }
});

// scroll to active item
watch(() => props.activeItem, () => {
  if (props.activeItem && props.activeItem.id === props.item.id) {
    itemRef.value?.scrollIntoView({ block: 'nearest' });
  }
});

function toggle() {
  if (props.item.type === 'file') {
    return;
  }

  emit('collapse', props.item, !props.collapsedItems.has(props.item.id));
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

function onDragStartNested(item: DirectoryItem) {
  emit('drag-start', item);
}

function onDropNested(item: DirectoryItem) {
  emit('drop', item);
}

function onDragStart() {
  emit('drag-start', props.item);
}

function onDrop() {
  isDragOver.value = false;
  emit('drop', props.item);
}

function onDragEnter() {
  if (props.item.type === 'folder') {
    isDragOver.value = true;
  }
}

function onDragLeave() {
  isDragOver.value = false;
}

function handleCollapse(item: DirectoryItem, collapsed: boolean) {
  emit('collapse', item, collapsed);
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
  border: 1px solid transparent;
}

.folder-item:hover:not(input) {
  cursor: pointer;
  background-color: var(--hover-color);
}

.folder-item.active:not(input) {
  background-color: var(--active-color);
}

.folder-item.right-clicked {
  border-color: var(--active-border-color);
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

.drop-target {
  border: 1px dashed #007acc;
}
</style>
