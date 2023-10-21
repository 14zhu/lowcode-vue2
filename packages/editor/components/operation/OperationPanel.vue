<template>
  <div class="block">
    <div class="flex justify-center items-center h-10 hover:bg-lime-100">
      <slot />
    </div>
    <div :id="operationPanelId" :class="operationPanelId" draggable="true" @drag="onDrag" @dragstart="onDragStart" @dragend="onDragEnd">
      <drag-component :label="'button'" data-name="sc-button" />
      <drag-component :label="'input'" data-name="sc-input" />
      <drag-component :label="'table'" data-name="sc-table" />
    </div>
    <div v-if="isDragging" :style="dragIconStyle" class="drag-icon"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { CoreEvents } from '@lowcode-vue2/core'

@Component({
  name: 'operation-panel',
})
export default class OperationPanel extends Vue {
  $emitter: any

  isDragging: boolean = false

  operationPanelId: string = 'operation-panel'

  dragTarget: HTMLElement | null = null

  onDrag(event: DragEvent) {
    this.$emitter.emit(CoreEvents.EVENT_DRAG, {
      size: { w: 2 },
    })
  }

  onDragStart(event: DragEvent) {
    this.dragTarget = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement
    // 隐藏默认的拖动图标
    event.dataTransfer!.setDragImage(new Image(), 0, 0)
  }

  onDragEnd(event: DragEvent) {
    this.$emitter.emit(CoreEvents.EVENT_DRAG_END, {
      name: this.dragTarget!.dataset.name,
      size: { w: 2, h: 2 },
    })
  }
}
</script>

<style scoped>
.operation-panel {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.drag-icon {
  width: 32px;
  height: 32px;
  background-image: url('../icon/sc-button.png');
  background-size: cover;
  position: absolute;
  pointer-events: none; /* 防止遮挡鼠标事件 */
  z-index: 9999; /* 确保拖动图标在最顶层 */
}
</style>
