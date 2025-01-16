import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import CreateIdea from '@/views/user/CreateIdea.vue'
import CreateGroup from '@/views/user/CreateGroup.vue'
import CreateGroupIdea from '@/views/user/CreateGroupIdea.vue'
import HomeView from '@/views/user/HomeView.vue'
import DetailIdeaView from '@/views/user/DetailIdeaView.vue'
import MyBoardView from '@/views/user/MyBoardView.vue'
import EditIdea from '@/components/idea/EditIdea.vue'
import MyIdea from '@/components/my-ideas/MyIdea.vue'
import MyHistoryActivity from '@/components/history-activities/MyHistoryActivity.vue'
import SettingsView from '@/views/user/SettingsPage.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import NotFoundPage from '@/views/user/NotFoundPage.vue'
import ProfilePage from '@/views/user/ProfilePage.vue'
import GroupView from '@/views/user/GroupView.vue'

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
          path: '/group/:groupId',
          name: 'group',
          component: GroupView
        },

        {
          path: '/create-idea',
          name: 'create-idea',
          component: CreateIdea
        },
        {
          path: '/create-group-idea/:groupId',
          name: 'create-group-idea',
          component: CreateGroupIdea
        },
        {
          path: '/create-group',
          name: 'create-group',
          component: CreateGroup
        },
        {
          path: '/idea/:type/:id/:commentId?',
          name: 'detail-idea',
          component: DetailIdeaView
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsView
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfilePage
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
      ]
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    { path: '/:pathMatch(.*)*', component: NotFoundPage }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')
  if (to.name === 'sign-in' && token) {
    next({ name: 'home' }) // Redirect to home if already signed in
  } else if (to.name !== 'sign-in' && !token) {
    next({ name: 'sign-in' }) // Redirect to sign-in if not authenticated
  } else {
    next() // Proceed to the route
  }
})

export default router
