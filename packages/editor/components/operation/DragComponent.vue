<template>
  <div class="drag-component">
    {{ label }}
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component({
  name: 'drag-component',
})
export default class DragComponent extends Vue {
  @Prop({
    type: String,
    default: 'label',
  })
  label!: string
}
</script>

<style scoped>
.drag-component {
  cursor: pointer;
  height: 50px;
  flex-basis: calc(33.33% - 22px);
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid silver;
  user-select: none;
}
</style>
