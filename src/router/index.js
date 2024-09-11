import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import CreateIdea from '@/views/user/CreateIdea.vue'
import HomeView from '@/views/user/HomeView.vue'
import DetailIdeaView from '@/views/user/DetailIdeaView.vue'
import MyBoardView from '@/views/user/MyBoardView.vue'
import EditIdea from '@/components/idea/EditIdea.vue'
import MyIdea from '@/components/my-ideas/MyIdea.vue'
import MyHistoryActivity from '@/components/history-activities/MyHistoryActivity.vue'
import ProfileView from '@/views/user/ProfilePage.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import NotFoundPage from '@/views/user/NotFoundPage.vue'
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
    },
    { path: '/:pathMatch(.*)*', component: NotFoundPage }
  ]
})

export default router
