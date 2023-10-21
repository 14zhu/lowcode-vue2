import Editor from './Editor.vue'
import Actions from './action/Actions.vue'
import DragComponent from './operation/DragComponent.vue'
import OperationPanel from './operation/OperationPanel.vue'
import PropertyEditor from './property/PropertyEditor.vue'
import Setting from './setting/Setting.vue'

const EditorComponents = {
  install(Vue: any) {
    Vue.component('editor', Editor)
    Vue.component('actions', Actions)
    Vue.component('drag-component', DragComponent)
    Vue.component('operation-panel', OperationPanel)
    Vue.component('property-editor', PropertyEditor)
    Vue.component('setting', Setting)
  },
}

export {
  Actions,
  Editor,
  EditorComponents,
  OperationPanel,
  PropertyEditor,
  Setting,
}
