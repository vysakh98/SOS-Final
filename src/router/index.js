import Vue from 'vue'
import VueRouter from 'vue-router'
import table1 from '@/components/Expectedsosincome.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'table1',
    component: table1
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
