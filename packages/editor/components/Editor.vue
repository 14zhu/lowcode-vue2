<template>
  <div class="flex w-full h-full overflow-hidden bg-lime-50 bg-opacity-50">
    <operation-panel :class="operationExtend ? 'basis-1/5' : 'basis-20'" class="flex-grow-0 flex-shrink-0 transition-all ease-in-out">
      <span class="cursor-pointer select-none" @click="operationExtend = !operationExtend">
        <i v-if="operationExtend" class="el-icon-arrow-left"></i>
        <i v-else class="el-icon-arrow-right"></i>
      </span>
    </operation-panel>
    <div class="flex-grow flex-shrink main-area">
      <setting />
      <layout-area />
      <actions />
    </div>
    <property-editor :class="propertyExtend ? 'basis-1/3' : 'basis-20'" class="flex-grow-0 flex-shrink-0 transition-all ease-in-out">
      <span class="cursor-pointer select-none" @click="propertyExtend = !propertyExtend">
        <i v-if="propertyExtend" class="el-icon-arrow-right"></i>
        <i v-else class="el-icon-arrow-left"></i>
      </span>
    </property-editor>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'editor',
})
export default class Editor extends Vue {
  operationExtend = false
  propertyExtend = false
}
</script>

<style scoped>
.main-area {
  height: calc(100vh - 200px);
}
</style>
