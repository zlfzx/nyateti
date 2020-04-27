import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'

import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login Nyateti'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register Nyateti'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    path: '/notes',
    name: 'Notes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Notes.vue'),
    meta: {
      title: 'Notes',
      requiresAuth: true
    }
  },
  {
    path: '/tambah-notes',
    name: 'TambahNotes',
    component: () => import(/* webpackChunkName: "about" */ '../views/TambahNotes.vue'),
    meta: {
      title: 'Tambah Notes',
      requiresAuth: true
    }
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Todo.vue'),
    meta: {
      title: 'ToDo List',
      requiresAuth: true
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue'),
    meta: {
      title: 'Calendar',
      requiresAuth: true
    }
  },
  {
    path: '/routines',
    name: 'Routines',
    component: () => import(/* webpackChunkName: "about" */ '../views/Routines.vue'),
    meta: {
      title: 'Routines',
      requiresAuth: true
    }
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue'),
    meta: {
      title: 'Profil',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // let currentUser = firebase.auth().currentUser
  let currentUser = store.getters.user.loggedIn
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log(store.state.user.loggedIn)

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
