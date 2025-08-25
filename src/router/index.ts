import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue'),
    },
    {
      path: '/cat',
      name: 'cat',
      component: () => import('../views/CatView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/animation',
      name: 'animation',
      component: () => import('../views/AnimationView.vue'),
    },
    {
      path: '/three',
      name: 'three',
      component: () => import('../views/ThreeView.vue'),
    },
    {
      path: '/scene',
      name: 'scene',
      component: () => import('../views/SceneView.vue'),
    },
  ],
})

export default router
