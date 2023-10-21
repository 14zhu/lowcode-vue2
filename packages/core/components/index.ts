import { GridItem, GridLayout } from 'vue-grid-layout'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import { VueEmitter } from '../event'
import Drop from './Drop.vue'
import LayoutArea from './LayoutArea.vue'

const CoreComponents = {
  install(Vue: any) {
    Vue.component('grid-layout', GridLayout)
    Vue.component('grid-item', GridItem)
    Vue.component('vue-simple-context-menu', VueSimpleContextMenu)
    Vue.component('drop', Drop)
    Vue.component('layout-area', LayoutArea)
  },
}

const CorerEvents = {
  install(Vue: any) {
    Vue.use(VueEmitter)
    // Vue.use(EventMixin)
  },
}

export { CoreComponents, CorerEvents, LayoutArea }
