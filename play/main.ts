import { ComponentList } from '@lowcode-vue2/components'
import { CoreComponents, CorerEvents } from '@lowcode-vue2/core'
import { EditorComponents } from '@lowcode-vue2/editor'
import './tailwind.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ComponentList)
Vue.use(CoreComponents)
Vue.use(EditorComponents)
Vue.use(ElementUI)
Vue.use(CorerEvents)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
