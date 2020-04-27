<template>
  <div>
    <AppHeader></AppHeader>
    <div class="bg-top"></div>
    <div class="main">
        <b-container class="py-5">
            <div class="d-flex flex-column justify-content-center align-items-center pb-5">
                <h1 class="font-amatic text-center text-white">Profil</h1>
            </div>
            <b-container class="bg-white rounded p-4">
                <div class="d-flex justify-content-center align-items-center empty-notes">
                    <b-button @click="logout" variant="danger" size="lg">Logout</b-button>
                </div>
            </b-container>
        </b-container>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import AppHeader from '@/components/layouts/AppHeader'
export default {
  name: 'Profil',
  components: {
    AppHeader
  },
  methods: {
    async logout () {
      firebase.auth().signOut()
      // this.$store.state.user.loggedIn = false
      this.$store.dispatch('fetchUser', null)
      await this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.bg-top{
    position: relative;
    height: 20rem;
    background-color: #dc3545
}
.main{
    padding-top: 50px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
.font-amatic{
    letter-spacing: 10px;
}
.empty-notes{
    height: 50vh;
}
</style>
