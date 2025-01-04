<template>
  <div class="sidebar">
    <div class="folder-list">
      <folder-item v-for="item in items" :key="item.id" :item="item" :level="0" @item-clicked="handleItemClick"></folder-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FolderItem from './FolderItem.vue';

interface Item {
  id: number;
  name: string;
  type: 'folder' | 'file';
  children?: Item[];
}

const items = ref<Item[]>([
  {
    id: 1,
    name: 'Folder 1',
    type: 'folder',
    children: [
      { id: 2, name: 'Subfolder 1-1', type: 'folder', children: [
        { id: 7, name: 'Subfolder 1-1-1', type: 'folder', children: [
          { id: 8, name: 'File 1-1-1-1', type: 'file' }
        ]},
        { id: 9, name: 'File 1-1-1', type: 'file' }
      ]},
      { id: 3, name: 'File 1-1', type: 'file' }
    ]
  },
  {
    id: 4,
    name: 'Folder 2',
    type: 'folder',
    children: [
      { id: 5, name: 'File 2-1', type: 'file' }
    ]
  },
  {
    id: 6,
    name: 'File 1',
    type: 'file'
  }
]);

const emit = defineEmits(['item-clicked']);

function handleItemClick(itemName: string) {
  emit('item-clicked', itemName);
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 10px;
  user-select: none;
}

.folder-list {
  padding: 0;
  margin: 0;
}
</style>
