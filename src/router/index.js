import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailModal from '@/components/DetailModal.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/member',
      name: 'member',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MemberView.vue'),
    },
    {
      path: '/planner',
      name: 'planner',
      component: () => import('../views/PlannerView.vue'),
      children: [
        { path: 'detail', component: DetailModal },
      ],
    },
    {
      path: "/SearchArea",
      name: "SearchArea",
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: "/category/:category?",
      name: "CategoryView",
      component: () => import('../views/CategoryView.vue'),
    }
  ],
})

export default router
