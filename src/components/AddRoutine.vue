<template>
  <div>
    <b-modal ref="modal" title="Tambah Rutinitas" hide-footer centered>
      <b-form @submit.prevent="addRoutine">
        <b-form-group>
          <b-form-input v-model="routine.title" placeholder="Apa rutinitas anda?"></b-form-input>
        </b-form-group>
        <b-row>
          <b-col cols="6">
            <b-form-group label-size="sm" label="Mulai" label-for="mulai">
              <b-form-timepicker id="mulai" v-model="routine.startTime" locale="id"></b-form-timepicker>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label-size="sm" label="Sampai" label-for="sampai">
              <b-form-timepicker id="sampai" v-model="routine.endTime" locale="id"></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group label="Kategori">
          <b-form-radio-group
            id="btn-radios-2"
            v-model="selected"
            :options="options"
            buttons
            stacked
            size="sm"
            button-variant="outline-danger"
            name="radio-btn-outline"
            class="w-100"
          ></b-form-radio-group>
        </b-form-group>
        <b-button type="submit" variant="danger" class="float-right">Simpan</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { db } from '../main'
import jsDate from 'js-date'
export default {
  name: 'AddRoutine',
  data () {
    return {
      routine: {
        title: '',
        startTime: '',
        endTime: '',
        categoryId: '',
        category: '',
        userId: this.$store.getters.user.data.uid,
        createdAt: '',
        updatedAt: '0000-00-00 00:00:00'
      },
      selected: '',
      options: [
        { text: 'Belajar', value: '1|Belajar' },
        { text: 'Main Game', value: '2|Main Game' },
        { text: 'Asah Skill', value: '3|Asah Skill' },
        { text: 'Olahraga', value: '4|Olahraga' },
        { text: 'Tidur', value: '5|Tidur' },
        { text: 'Makan', value: '6|Makan' },
        { text: 'Nyantai', value: '7|Nyantai' },
        { text: 'Nongkrong', value: '8|Nongkrong' }
      ]
    }
  },
  methods: {
    modal () {
      this.$refs['modal'].show()
    },
    addRoutine () {
      this.routine.categoryId = this.selected.split('|')[0]
      this.routine.category = this.selected.split('|')[1]
      this.routine.createdAt = jsDate.date('Y-m-d H:i:s', new Date())
      // console.log(this.routine)
      if (this.routine.title !== '' && this.routine.startTime !== '' && this.routine.endTime !== '' && this.routine.category !== '') {
        db.collection('routines').add(this.routine)
          .then(() => {
            this.$swal({
              title: 'Berhasil Disimpan',
              icon: 'success'
            })
            this.$refs['modal'].hide()
            console.log('Berhasil Disimpan')
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.$swal({
          title: 'Data Belum Lengkap',
          icon: 'error'
        })
      }
    }
  }
}
</script>
