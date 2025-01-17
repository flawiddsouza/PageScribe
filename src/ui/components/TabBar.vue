<template>
  <div
    ref="tabs"
    class="tabs"
    @wheel.prevent="scrollTabs"
  >
    <div
      v-for="(tab, index) in tabs"
      ref="tab"
      :key="tab.id"
      class="tab"
      :class="{ active: tab === activeTab }"
      draggable="true"
      @mousedown="emit('tab-clicked', tab); justClickedTab = tab;"
      @mouseup.middle.prevent="emit('close-tab', tab)"
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
import { onUnmounted, watch, useTemplateRef, nextTick, onMounted, ref } from 'vue';
import { DirectoryItem } from './types';

const props = defineProps<{
  tabs: DirectoryItem[];
  activeTab: DirectoryItem | null;
}>();

const emit = defineEmits(['tab-clicked', 'close-tab', 'reorder-tabs']);

let draggedTabIndex: number | null = null;

const tabsRef = useTemplateRef('tabs');
const tabRefs = useTemplateRef('tab');

const justClickedTab = ref<DirectoryItem | null>(null);

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
    // don't scroll if the tab was just clicked, as it will already be in view and a scroll jump is annoying
    if (justClickedTab.value === props.activeTab) {
      justClickedTab.value = null;
      return;
    }

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

function scrollTabs(event: WheelEvent) {
  if (!tabsRef.value) {
    throw new Error('tabsRef is not set - this should not happen');
  };

  tabsRef.value.scrollLeft += event.deltaY;
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
