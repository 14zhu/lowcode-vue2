<template>
  <el-button :type="type" :size="size">{{ label }}</el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'sc-button',
})
export default class ScButton extends Vue {
  @Prop({
    type: String,
    default: 'primary',
  })
  type!: string
  @Prop({
    type: String,
    default: 'small',
  })
  size!: string
  @Prop({
    type: String,
    default: '',
  })
  label!: string
}
</script>

<style scoped>
.el-button {
  height: 100% !important;
  width: 100% !important;
}
</style>
