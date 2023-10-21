import ScButton from './ScButton/index.vue'
import ScInput from './ScInput/index.vue'

const ComponentList = {
  install(Vue: any) {
    Vue.component('sc-button', ScButton)
    Vue.component('sc-input', ScInput)
  },
}

export { ComponentList, ScButton, ScInput }
