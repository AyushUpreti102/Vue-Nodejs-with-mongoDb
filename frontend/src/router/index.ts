import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailPage from '@/views/DetailPage.vue'
import AuthPage from '@/views/AuthPage.vue'
import beforeResolve from './beforeResolve'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:id',
      name: 'details-page',
      component: DetailPage
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage
    }
  ]
})

router.beforeResolve(beforeResolve)

export default router
