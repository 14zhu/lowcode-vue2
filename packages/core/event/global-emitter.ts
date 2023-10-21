import * as UiEvents from './event-types'
import mitt, { Emitter } from './mitt'

type EventKeys = keyof typeof UiEvents
export type Events = { [key in EventKeys]: any } // eslint-disable-line no-unused-vars

const emitter: Emitter<Events> = mitt<Events>()

const VueEmitter = function (Vue: any) {
  Object.defineProperty(Vue.prototype, '$emitter', {
    get() {
      return emitter
    },
  })
}

export { VueEmitter }
