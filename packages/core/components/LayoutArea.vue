<template>
  <div class="layout-area" @contextmenu.prevent.stop="onContextMenu" data-name="layout">
    <grid-layout
      :layout.sync="layout"
      :ref="gridLayoutRef"
      :id="gridLayoutId"
      :colNum="colNum"
      :rowHeight="rowHeight"
      :margin="margin"
      :isResizable="true"
      :isDraggable="true"
      :autoSize="true"
      :verticalCompact="false"
      :preventCollision="false"
      :useCssTransforms="true"
      data-name="grid-layout"
    >
      <grid-item v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :static="false" class="touch-none select-none box-border">
        <component :is="item.name" v-bind="item.props" :data-name="item.name" />
      </grid-item>
    </grid-layout>
    <vue-simple-context-menu :ref="vueSimpleContextMenuRef" :element-id="contextMenuId" :options="contextmenuOptions" @option-clicked="onContextmenuOption" />
    <el-button style="position: fixed; bottom: 0" @click="onLayout">layout</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EVENT_DRAG, EVENT_DRAG_END } from '../event/event-types'
import { v4 as uuidv4 } from 'uuid'
import { BaseContextmenuOptions } from '../constants'
import { runContextmenuMethod, calcColWidth } from '../helper'
import { GridComponent } from '../types'

const mouseXY = { x: 0, y: 0 }
const DragPosition = { x: 0, y: 0, w: 1, h: 1, i: '' }

@Component({
  name: 'layout-area',
})
export default class LayoutArea extends Vue {
  $emitter: any
  $refs: any

  @Prop({ type: Number, default: 1 })
  readonly transformScale!: number

  colNum = 20
  rowHeight = 30
  margin = [0, 0]
  layout: any[] = [
    {
      id: '0',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      i: '0',
      name: 'sc-button',
      props: { label: 'btn', size: 'medium', type: 'success' },
    },
    {
      id: '1',
      x: 2,
      y: 3,
      w: 6,
      h: 3,
      i: '1',
      name: 'sc-input',
      props: { size: 'medium', placeholder: 'please input' },
    },
  ]
  gridLayoutId = uuidv4()
  gridLayoutRef = 'gridLayoutRef'
  DRAG_COMPONENT_IDENTIFIER = 'drop'
  contextMenuId = uuidv4()
  vueSimpleContextMenuRef = 'vueSimpleContextMenuRef'

  contextmenuOptions = BaseContextmenuOptions

  mounted() {
    this.$emitter.on(EVENT_DRAG, this.onDragEvent)
    this.$emitter.on(EVENT_DRAG_END, this.onDragEndEvent)
    document.addEventListener('dragover', function (e) {
      e.preventDefault()
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    })
  }

  onLayout() {
    console.log(this.layout)
  }

  onDragEvent({ size }: { size: { w: number } }) {
    const parentRect = document.getElementById(this.gridLayoutId)!.getBoundingClientRect()
    let mouseInGrid = false
    if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom + 100) {
      mouseInGrid = true
    }
    let index = this.layout.findIndex((item) => item.i === this.DRAG_COMPONENT_IDENTIFIER)
    if (mouseInGrid && index === -1) {
      this.layout.push({
        id: uuidv4(),
        x: 1,
        y: 1,
        w: 1,
        h: 1,
        fixable: false,
        deletable: true,
        i: this.DRAG_COMPONENT_IDENTIFIER,
        name: this.DRAG_COMPONENT_IDENTIFIER,
        componentName: '',
        props: [],
        events: [],
        items: [],
        jsUrl: '',
        version: '',
        className: '',
      })
      index = this.layout.length - 1
    }
    if (index !== -1) {
      try {
        const el = this.$refs[this.gridLayoutRef].$children[index]
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left,
        }
        el.innerW = size.w
        const newPosition = el.calcXY((mouseXY.y - parentRect.top) / this.transformScale, (mouseXY.x - parentRect.left) / this.transformScale)
        if (mouseInGrid) {
          this.$refs[this.gridLayoutRef].dragEvent('dragstart', this.DRAG_COMPONENT_IDENTIFIER, newPosition.x, newPosition.y, 1, 1)
          DragPosition.i = String(index)
          DragPosition.x = this.layout[index].x
          DragPosition.y = this.layout[index].y
        } else {
          this.$refs[this.gridLayoutRef].dragEvent('dragend', this.DRAG_COMPONENT_IDENTIFIER, newPosition.x, newPosition.y, 1, 1)
          // delete drag component
          this.layout = this.layout.filter((obj) => obj.i !== this.DRAG_COMPONENT_IDENTIFIER)
        }
      } catch (e) {
        //
      }
    }
  }

  onDragEndEvent({ name, size }: { name: string; size: { w: number; h: number } }) {
    const parentRect = document.getElementById(this.gridLayoutId)!.getBoundingClientRect()
    let mouseInGrid = false
    if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom + 100) {
      mouseInGrid = true
    }
    if (mouseInGrid) {
      this.$refs[this.gridLayoutRef].dragEvent('dragend', this.DRAG_COMPONENT_IDENTIFIER, DragPosition.x, DragPosition.y, 1, 1)
      this.layout = this.layout.filter((obj) => obj.i !== this.DRAG_COMPONENT_IDENTIFIER)
      const addItem = {
        id: uuidv4(),
        x: DragPosition.x,
        y: DragPosition.y,
        w: size.w,
        h: size.h,
        i: uuidv4(),
        name: name,
      }
      this.layout.push(addItem)
    }
    console.log(this.layout)
  }

  onContextMenu(event: MouseEvent) {
    const target = this.getComponentByPosition(event)
    this.$refs[this.vueSimpleContextMenuRef].showMenu(event, target)
    const el = document.getElementById(this.contextMenuId)
    if (el) {
      const parentRect = document.getElementById(this.gridLayoutId)!.getBoundingClientRect()
      el.setAttribute('style', `top: ${event.clientY - parentRect.top}px; left: ${event.clientX - parentRect.left}px;`)
    }
  }

  getComponentByPosition(event: MouseEvent) {
    const { left, top, right } = (document as any).getElementById(this.gridLayoutId).getBoundingClientRect()
    const colWidth = calcColWidth(right - left, this.margin[0], this.colNum)
    let x = (event.clientX - left) / this.transformScale
    x = Math.ceil(x / colWidth)
    let y = (event.clientY - top) / this.transformScale
    y = Math.ceil(y / this.rowHeight)
    const component = this.layout.find((c) => c.x <= x && c.x + c.w >= x && c.y <= y && c.y + c.h >= y)
    return component
  }

  onContextmenuOption(event: MouseEvent) {
    runContextmenuMethod(event, this)
  }

  onClickDeleteItem(component: GridComponent) {
    const index = this.layout.findIndex((c) => c.id === component.id)
    console.log(index)
    this.layout.splice(index, 1)
  }
}
</script>

<style>
.vue-simple-context-menu i {
  margin-right: 8px;
  color: cornflowerblue;
}
.vue-simple-context-menu .text-option {
  margin-left: 22px;
}
.vue-simple-context-menu {
  background-color: #fffafa !important;
  font-size: 14px;
  white-space: nowrap;
}
.vue-simple-context-menu .disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
.vue-simple-context-menu__divider {
  box-sizing: content-box !important;
  height: 1px !important;
  background-color: #dcdfe6 !important;
  padding: 3px 0 !important;
}
.vue-simple-context-menu__item:hover {
  background-color: rgba(0, 122, 255, 0.2) !important;
  color: #000 !important;
}
.vue-grid-item.vue-grid-placeholder {
  background: green !important;
}
</style>

<style scoped>
.layout-area {
  position: relative;
}
.layout-area::before {
  content: '';
  background-size: 6px 30px, calc(100% / 20) 6px;
  background-image: radial-gradient(1px 1px at bottom, #7c7c7c 1px, transparent 1px), radial-gradient(1px 1px at right, #7c7c7c 1px, transparent 1px);
  height: calc(100% + 100px);
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f0f8ff;
  background-repeat: repeat;
  position: absolute;
}
</style>
>
