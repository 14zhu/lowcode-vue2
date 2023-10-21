<template>
  <el-form>
    <el-form-item label="colNum">
      <el-input placeholder="colNum" v-model="cols" size="mini" @input="onInput('cols', $event)" />
    </el-form-item>
    <el-form-item label="rowHeight">
      <el-input placeholder="rowHeight" v-model="lineHeight" size="mini" @input="onInput('lineHeight', $event)" />
    </el-form-item>
    <el-form-item label="marginX">
      <el-input placeholder="marginX" v-model="marginHorizontal" size="mini" @input="onInput('marginHorizontal', $event)" />
    </el-form-item>
    <el-form-item label="marginY">
      <el-input placeholder="marginY" v-model="marginVertical" size="mini" @input="onInput('marginVertical', $event)" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DEFAULT_COL_NUM, DEFAULT_ROW_HEIGHT, DEFAULT_MARGIN_HORIZONTAL, DEFAULT_MARGIN_VERTICAL } from '../../constants'

@Component({
  name: 'setting',
})
export default class Setting extends Vue {
  @Prop({ type: Number, default: DEFAULT_COL_NUM })
  colNum!: number

  @Prop({ type: Number, default: DEFAULT_ROW_HEIGHT })
  rowHeight!: number

  @Prop({ type: Number, default: DEFAULT_MARGIN_HORIZONTAL })
  marginX!: number

  @Prop({ type: Number, default: DEFAULT_MARGIN_VERTICAL })
  marginY!: number

  cols = this.colNum
  lineHeight = this.rowHeight
  marginHorizontal = this.marginX
  marginVertical = this.marginY

  onInput(type: string, val: any) {
    console.log(type, val)
  }
}
</script>

<style scoped>
.el-form-item {
  display: inline-block;
  width: 100px;
  margin-bottom: 0;
}
.el-form-item + .el-form-item {
  margin-left: 20px;
}
</style>
