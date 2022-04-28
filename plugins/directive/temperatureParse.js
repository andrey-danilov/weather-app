import Vue from 'vue'

function makeBaseParse(el) {
  if (!el.innerText) {
    return ''
  }

  el.innerText = el.innerText > 0 ? `+ ${el.innerText}` : `${el.innerText}`
}

Vue.directive('temperature-parse', {
  bind: makeBaseParse,
  update: makeBaseParse,
})
