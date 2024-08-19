import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import CreateIdea from '@/views/user/CreateIdea.vue'
import HomeView from '@/views/user/HomeView.vue'
import DetailIdeaView from '@/views/user/DetailIdeaView.vue'
import SkeletonView from '@/views/user/SkeletonView.vue'
import MyBoardView from '@/views/user/MyBoardView.vue'
import EditIdea from '@/components/EditIdea.vue'
import MyIdea from '@/components/MyIdea.vue'
import MyHistoryActivity from '@/components/MyHistoryActivity.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/create-idea',
      name: 'create-idea',
      component: CreateIdea
    },
    {
      path: '/idea/:id',
      name: 'detail-idea',
      component: DetailIdeaView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/skeleton',
      name: 'skeleton',
      component: SkeletonView
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/my-board',
      name: 'my-board',
      component: MyBoardView,
      children: [
        { path: 'edit/:type/:id', name: 'edit', component: EditIdea },
        { path: '', name: 'my-board-ideas', component: MyIdea },
        { path: 'history', name: 'history', component: MyHistoryActivity }
      ]
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
