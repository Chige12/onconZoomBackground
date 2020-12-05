import Vue from 'vue'

Vue.mixin({
  destroyed() {
    if (this._eventRemovers) {
      this._eventRemovers.forEach(function (eventRemover) {
        eventRemover.remove()
      })
    }
  },
  methods: {
    listen(target, eventType, callback) {
      if (!this._eventRemovers) {
        this._eventRemovers = []
      }
      target.addEventListener(eventType, callback)
      this._eventRemovers.push({
        remove() {
          target.removeEventListener(eventType, callback)
        },
      })
    },
    $delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
  },
})
