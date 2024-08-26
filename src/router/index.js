import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import CreateIdea from '@/views/user/CreateIdea.vue'
import HomeView from '@/views/user/HomeView.vue'
import DetailIdeaView from '@/views/user/DetailIdeaView.vue'
import SkeletonView from '@/views/user/SkeletonView.vue'
import MyBoardView from '@/views/user/MyBoardView.vue'
import EditIdea from '@/components/idea/EditIdea.vue'
import MyIdea from '@/components/my-ideas/MyIdea.vue'
import MyHistoryActivity from '@/components/history-activities/MyHistoryActivity.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-layout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },

        {
          path: 'create-idea',
          name: 'create-idea',
          component: CreateIdea
        },
        {
          path: 'idea/:type/:id',
          name: 'detail-idea',
          component: DetailIdeaView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        },
        {
          path: 'skeleton',
          name: 'skeleton',
          component: SkeletonView
        },

        {
          path: 'my-board',
          name: 'my-board',
          component: MyBoardView,
          children: [
            { path: 'edit/:type/:id', name: 'edit', component: EditIdea },
            { path: '', name: 'my-board-ideas', component: MyIdea },
            { path: 'history', name: 'history', component: MyHistoryActivity }
          ]
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
