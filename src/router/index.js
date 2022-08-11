import { createRouter, createWebHashHistory } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
