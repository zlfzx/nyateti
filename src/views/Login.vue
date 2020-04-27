<template>
    <div class="bg-white">
        <b-container class="bg-white vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <img src="@/assets/img/icon.svg" class="icon" alt="">
            <h1 class="text-title">nyateti</h1>
            <p class="text-muted text-desc">Login dulu, planning kemudian</p>
            <b-col md="4" sm="10">
              <b-form @submit.prevent="login" class="w-100 text-center mt-5 w-50">
                  <b-alert
                  :show="alert"
                  :variant="alert_variant"
                  @dismissed="alert=0"
                  dismissible>
                      <p class="m-0 small">
                          {{ alert_val.message }}
                      </p>
                  </b-alert>
                  <b-form-group>
                      <b-form-input v-model="email" type="email" placeholder="Email"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="danger" size="sm" class="btn-block">Login</b-button>
                  <b-button @click="loginWithGoogle" variant="outline-primary" size="sm" class="btn-block my-2 mb-4">
                      <img src="@/assets/img/google.png" class="icon-google" alt="">
                      Login With Google
                  </b-button>
                  <b-link class="text-danger" to="/register">Create Account</b-link>
              </b-form>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      alert_val: {
        code: '',
        message: ''
      },
      alert: 0,
      alertSecs: 10,
      alert_variant: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then(data => {
          this.alert = this.alertSecs
          this.alert_variant = 'success'
          this.alert_val.message = 'Login Berhasil :)'
          setTimeout(() => {
            this.$router.replace('/')
          }, this.alertSecs)
        })
        .catch(e => {
          this.alert_val.code = e.code
          this.alert_val.message = e.message
          this.alert = this.alertSecs
          this.alert_variant = 'danger'
        })
    },
    loginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          // console.log(result)
          // this.$store.state.user.loggedIn = true
          this.$store.dispatch('fetchUser', result.user)
          this.$router.replace('/')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.text-desc{
    font-weight: bold !important;
}
.icon{
    width: 150px;
}
.icon-google{
    width: 20px;
}
</style>
