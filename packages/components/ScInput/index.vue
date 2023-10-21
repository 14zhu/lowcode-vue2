<template>
  <div class="base-input">
    <el-input v-model="input" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'sc-input',
})
export default class ScInput extends Vue {
  @Prop({
    type: String,
    default: '...',
  })
  placeholder!: string

  input = ''
}
</script>

<style scoped>
.base-input {
  height: 100%;
}
.base-input .el-input {
  height: 100%;
}
.base-input >>> .el-input__inner {
  height: 100% !important;
  width: 100% !important;
}
</style>
