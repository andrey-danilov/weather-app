import Vue from 'vue'
import Pagination from 'vue-pagination-2'

const PaginateModule = {
  install(Vue) {
    Vue.component('PaginationComponent', Pagination)
  },
}
Vue.use(PaginateModule)
