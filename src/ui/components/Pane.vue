<template>
  <div
    :style="{ ...style, flex: `${flexGrow} 1 0%` }"
    :data-min-width-px="minSize"
  >
    <slot />
  </div>
  <div
    v-if="!hideResizer"
    data-resizer
    class="resizer"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  style?: object;
  flexGrow: number;
  minSize?: string;
  hideResizer?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['resized']);

const flexGrow = ref(props.flexGrow);

watch(() => props.flexGrow, (newVal) => {
  flexGrow.value = newVal;
  emit('resized', newVal);
});
</script>

<style scoped>
.resizer {
  width: 4px;
  background-color: transparent;
  cursor: ew-resize;
}

.resizer:hover {
  background-color: darksalmon;
}
</style>
