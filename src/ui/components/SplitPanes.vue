<template>
  <div
    ref="splitPanesContainer"
    :style="{ flexDirection: horizontal ? 'row' : 'column', height }"
    class="split-panes"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  horizontal?: boolean;
  height?: string;
}

defineProps<Props>();

const splitPanesContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const container = splitPanesContainer.value;
  if (!container) return;

  const resizers = Array.from(container.querySelectorAll('[data-resizer]'));

  let activeResizer: HTMLElement | null = null;
  let leftPanelInitialRect: DOMRect | null = null;

  const onMouseDown = (e: MouseEvent, resizer: HTMLElement) => {
    e.preventDefault();
    activeResizer = resizer;
    leftPanelInitialRect = activeResizer.previousElementSibling?.getBoundingClientRect() ?? null;
  };

  resizers.forEach((resizer) => {
    resizer.addEventListener('mousedown', (e) => onMouseDown(e, resizer));
  });

  const onMouseMove = (e: MouseEvent) => {
    if (!activeResizer || !leftPanelInitialRect) return;

    e.preventDefault();

    const leftPanel = activeResizer.previousElementSibling as HTMLElement & { __vueParentComponent: any };
    const rightPanel = activeResizer.nextElementSibling as HTMLElement & { __vueParentComponent: any };

    if (!leftPanel || !rightPanel) return;

    const leftPanelWidth = Number(leftPanel.__vueParentComponent.props.flexGrow) || 1;
    const rightPanelWidth = Number(rightPanel.__vueParentComponent.props.flexGrow) || 1;

    const leftPanelCurrentRect = leftPanel.getBoundingClientRect();
    const rightPanelCurrentRect = rightPanel.getBoundingClientRect();
    const totalWidthBetweenLeftAndRightPanel = leftPanelWidth + rightPanelWidth;

    const x = e.clientX - leftPanelInitialRect.left;
    let newLeftPanelWidth = ((leftPanelWidth || 1) * x) / leftPanelCurrentRect.width;

    if (newLeftPanelWidth < leftPanelWidth && leftPanelCurrentRect.width <= parseInt(leftPanel.dataset.minWidthPx || '0', 10)) {
      newLeftPanelWidth = leftPanelWidth;
    }

    if (newLeftPanelWidth > totalWidthBetweenLeftAndRightPanel) {
      newLeftPanelWidth = leftPanelWidth;
    }

    if (newLeftPanelWidth > leftPanelWidth && rightPanelCurrentRect.width <= parseInt(rightPanel.dataset.minWidthPx || '0', 10)) {
      newLeftPanelWidth = leftPanelWidth;
    }

    leftPanel.__vueParentComponent.props.flexGrow = newLeftPanelWidth;
    rightPanel.__vueParentComponent.props.flexGrow = totalWidthBetweenLeftAndRightPanel - newLeftPanelWidth;
  };

  window.addEventListener('mousemove', onMouseMove);

  const onMouseUp = () => {
    activeResizer = null;
  };

  window.addEventListener('mouseup', onMouseUp);
});
</script>

<style scoped>
.split-panes {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
