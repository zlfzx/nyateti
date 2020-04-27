import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'

import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

// VueFire
Vue.use(firestorePlugin)

// firebase
import fireConfig from './config/firebase'
const firebaseConfig = {
  apiKey: fireConfig.apiKey,
  authDomain: fireConfig.authDomain,
  databaseURL: fireConfig.databaseURL,
  projectId: fireConfig.projectId,
  storageBucket: fireConfig.storageBucket,
  messagingSenderId: fireConfig.messagingSenderId,
  appId: fireConfig.appId,
  measurementId: fireConfig.measurementId
}
firebase.initializeApp(firebaseConfig)

// firebase.auth().onAuthStateChanged(user => {
//   if (!store.state.user.loggedIn) {
//     store.dispatch('fetchUser', user)
//   }
// })

// Database Firebase Firestore
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistance can be only enabled in one tab at a time
    } else if (err.code === 'unimplemented') {
      // browser not support
    }
  })

export const db = firebase.firestore()

// install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// CKEditor
Vue.use(CKEditor)

// Sweetalert2
Vue.use(VueSweetalert2)

firebase.auth().onAuthStateChanged(user => {
  if (!store.state.user.loggedIn) {
    store.dispatch('fetchUser', user)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
