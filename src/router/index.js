import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailModal from '@/components/DetailModal.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/planner',
      name: 'planner',
      component: () => import('../views/PlannerView.vue'),
      children: [
        { path: 'detail', component: DetailModal },
        {
          path: 'join/:shareToken',
          name: 'ConfirmJoinSchedule',
          component: () => import('../components/ConfirmJoinSchedule.vue')
        }
      ]
    },

    {
      path: '/SearchArea',
      name: 'SearchArea',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/premium',
      name: 'PremiumView',
      component: () => import('../views/PremiumView.vue')
    }
    // {
    //   path: "/category/:category?",
    //   name: "CategoryView",
    //   component: () => import('../views/CategoryView.vue'),
    // },
    // {
    //   path: '/plannerTest',
    //   name: 'plannerTest',
    //   component: () => import('../views/PlannerViewTest.vue'),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // 返回上次的位置
    } else {
      return { top: 0 }; // 默認滾動到頂部
    }
  }
});

export default router;
