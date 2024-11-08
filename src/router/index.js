import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LogoutView from '../views/LogoutView.vue'
import AuthView from '../views/AuthView.vue'
import UsersView from '@/views/UsersView.vue'
import UserEditView from '@/views/UsersEditView.vue'
import UserCreateView from '@/views/UsersCreateView.vue'
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import LoginLayout from '@/views/layouts/LoginLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component: DefaultLayout,
      redirect: '/',
      children:[
        {
          path: '/',
          name: 'Home',
          component : HomeView
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView
        },
        {
          path: '/logout',
          name: 'logout',
          component: LogoutView
        },
        {
          path: '/users',
          name: 'users',
          component: UsersView
        },
        {
          path: '/user/edit/:id',
          name: 'userEdit',
          component: UserEditView
        },
    
        {
          path: '/user/create',
          name: 'user_create',
          component: UserCreateView
        },
      ]
    },


    {
      path: '/login',
      name: 'login',
      component: AuthView
    },

    
  ]
})


router.beforeEach((to, from, next) => {
  
  const token = localStorage.getItem('token');

  if (token !== null && to.path == '/login') {  
    console.log('login');
    next({ name: 'users' })
  }
  else if(token === null && to.path == '/users'){    
    next({ name: 'login' })
  }

  else if(token === null && to.path == '/user/create'){
    next({ name: 'login' })
  }

  else if(token === null && to.path == '/logout'){
    next({ name: 'login' })
  }

  else {
    next() // Proceed to the route
  }

})


export default router
