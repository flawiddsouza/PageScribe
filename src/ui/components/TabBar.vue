<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in tabs"
      ref="tab"
      :key="tab.id"
      class="tab"
      :class="{ active: tab === activeTab }"
      draggable="true"
      @mousedown="emit('tab-clicked', tab)"
      @mousedown.middle.prevent="emit('close-tab', tab)"
      @dragstart="onDragStart($event, index)"
      @dragover.prevent
      @drop="onDrop($event, index)"
    >
      <div>{{ tab.name }}</div>
      <div
        class="close-btn"
        @click.stop="emit('close-tab', tab)"
      >
        <i class="codicon codicon-close" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, watch, useTemplateRef, nextTick, onMounted } from 'vue';
import { DirectoryItem } from './types';

const props = defineProps<{
  tabs: DirectoryItem[];
  activeTab: DirectoryItem | null;
}>();

const emit = defineEmits(['tab-clicked', 'close-tab', 'reorder-tabs']);

let draggedTabIndex: number | null = null;

const tabRefs = useTemplateRef('tab');

function onDragStart(event: DragEvent, index: number) {
  draggedTabIndex = index;
}

function onDrop(event: DragEvent, index: number) {
  if (draggedTabIndex !== null && draggedTabIndex !== index) {
    emit('reorder-tabs', { from: draggedTabIndex, to: index });
  }
  draggedTabIndex = null;
}

function cycleTabs(forward: boolean) {
  if (!props.activeTab) return;
  const currentIndex = props.tabs.findIndex(tab => tab === props.activeTab);
  let newIndex;
  if (forward) {
    newIndex = (currentIndex + 1) % props.tabs.length;
  } else {
    newIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length;
  }
  emit('tab-clicked', props.tabs[newIndex]);
}

function scrollToActiveTab() {
  if (props.activeTab) {
    nextTick(() => {
      const tabIndex = props.tabs.findIndex(tab => tab === props.activeTab);
      if (tabRefs.value && tabRefs.value[tabIndex]) {
        tabRefs.value[tabIndex].scrollIntoView({
          block: 'nearest',
          inline: 'center',
        });
      }
    });
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key.toLowerCase() === 'w') {
    if (props.activeTab) {
      event.preventDefault();
      emit('close-tab', props.activeTab);
    }
  }
  if (event.ctrlKey && event.key === 'Tab') {
    event.preventDefault();
    cycleTabs(!event.shiftKey);
  }
}

window.addEventListener('keydown', onKeyDown);

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown);
});

onMounted(() => {
  scrollToActiveTab();
});

watch(() => props.activeTab, () => {
  scrollToActiveTab();
});
</script>

<style scoped>
.tabs {
  display: flex;
  background-color: #f3f3f3;
  user-select: none;
  overflow: auto;
}

.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.tab.active {
  background-color: white;
}

.tab:not(.active) {
  background-color: #ececec;
}

.close-btn {
  margin-left: 0.5rem;
  color: #888;
  display: flex;
  align-items: center;
}

.close-btn i {
  padding-top: 2px; /* weird codeicon offset fix */
}

.close-btn i:hover {
  background-color: #ddd;
  border-radius: 0.3rem;
}
</style>
