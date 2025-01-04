<template>
  <div class="folder-item-container">
    <div @click="handleClick" class="folder-item" :style="{ paddingLeft: `${level * 20}px` }" v-if="item.type === 'folder'">
      <i class="codicon codicon-folder icon"></i> {{ item.name }}
    </div>
    <div @click="handleClick" class="folder-item" :style="{ paddingLeft: `${level * 20}px` }" v-else>
      <i class="codicon codicon-file icon"></i> {{ item.name }}
    </div>
    <div v-if="item.children && item.type === 'folder' && isOpen">
      <folder-item v-for="child in item.children" :key="child.id" :item="child" :level="level + 1" @item-clicked="handleChildClick"></folder-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import '@vscode/codicons/dist/codicon.css';

interface Item {
  id: number;
  name: string;
  type: 'folder' | 'file';
  children?: Item[];
}

const props = defineProps<{ item: Item, level: number }>();
const emit = defineEmits(['item-clicked']);
const isOpen = ref(true);

function toggle() {
  isOpen.value = !isOpen.value;
}

function handleChildClick(itemName: string) {
  emit('item-clicked', itemName);
}

function handleClick() {
  emit('item-clicked', props.item.name);
  toggle();
}
</script>

<style scoped>
.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  width: 100%;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 10px; /* Add margin to the right */
}
</style>
