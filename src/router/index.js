import Vue from 'vue'
import Router from 'vue-router'
import arcmap from '@/components/arcmap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'arcmap',
      component: arcmap
    }
  ]
})
