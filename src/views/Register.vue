<template>
    <div class="bg-white">
        <b-container class="bg-white vh-100 d-flex justify-content-center align-items-center flex-column">
            <img class="icon" src="@/assets/img/register.svg" alt="">
            <h5 class="text-center text-muted text-desc mt-2">Daftar dulu yuk biar bisa mulai nyateti</h5>
            <b-col md="4" sm="8">
              <b-form @submit.prevent="register" class="w-100 mt-5 w-50">
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
                    <b-form-input v-model="email" :state="validEmail" type="email" placeholder="Email"></b-form-input>
                    <b-form-invalid-feedback>
                      Email harus diisi!
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="password" :state="validPassword" type="password" placeholder="Password"></b-form-input>
                    <b-form-invalid-feedback>
                      Password minimal berjumlah 6 karakter!
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="confirm_password" :state="confirmPassword" type="password" placeholder="Ulangi Password"></b-form-input>
                    <b-form-invalid-feedback :state="confirmPassword">
                      Password tidak sama!
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-button type="submit" variant="danger" size="sm" class="btn-block">Daftar</b-button>

                <p class="text-center mt-3">Sudah punya akun? <b-link to="/login">Login</b-link></p>
              </b-form>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      confirm_password: '',
      alert: 0,
      alert_variant: '',
      alertSecs: 10,
      alert_val: {
        code: '',
        message: ''
      }
    }
  },
  methods: {
    countDownChanged (alert) {
      this.alert = alert
    },
    register () {
      if (this.email !== '' && this.password !== '' && this.confirm_password === this.password && this.password.length >= 6) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          // eslint-disable-next-line no-unused-vars
          .then(data => {
            this.alert = 5
            this.alert_variant = 'success'
            this.alert_val.message = 'Pendaftaran berhasil, silakan login!'
            setTimeout(() => {
              this.$router.replace('/login')
            }, 5000)
          })
          .catch((e) => {
            console.log(e)
            this.alert_val.code = e.code
            this.alert_val.message = e.message
            this.alert = this.alertSecs
            this.alert_variant = 'danger'
          })
        // this.$router.push('/')
      } else {
        console.log('no')
        this.$swal({
          title: 'Data Belum Lengkap!',
          icon: 'error'
        })
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    validEmail () {
      if (this.email !== '') {
        return true
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    validPassword: function () {
      if (this.password !== '' && this.password.length < 6) {
        return false
      }
      if (this.password !== '') {
        return true
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    confirmPassword () {
      if (this.confirm_password !== '' && this.password !== '') {
        return this.confirm_password === this.password
      }
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
