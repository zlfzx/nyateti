<template>
  <div>
    <b-modal ref="modal" size="lg" title="Tambah Event" hide-footer centered>
      <b-form @submit.prevent="saveEvent">
        <b-form-group>
          <b-form-input v-model="event.title" placeholder="Judul"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-textarea v-model="event.description" rows="4" placeholder="Detail Acara"></b-form-textarea>
        </b-form-group>
        <b-row>
          <b-col cols="6">
            <b-form-group label-size="sm" label="Mulai" label-for="mulai">
              <b-form-timepicker id="mulai" v-model="event.startTime" locale="id"></b-form-timepicker>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label-size="sm" label="Sampai" label-for="sampai">
              <b-form-timepicker id="sampai" v-model="event.endTime" locale="id"></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button class="float-right" type="submit" variant="danger">Simpan</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { db } from '../main'
import jsDate from 'js-date'
export default {
  name: 'AddEventCalendar',
  data () {
    return {
      event: {
        date: '',
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        userId: '',
        createdAt: '',
        upatedAt: '0000-00-00 00:00:00'
      }
    }
  },
  methods: {
    modal (date) {
      this.event.date = date
      this.$refs['modal'].show()
    },
    saveEvent () {
      if (this.event.title !== '' && this.event.description !== '') {
        this.event.userId = this.$store.getters.user.data.uid
        this.event.createdAt = jsDate.date('Y-m-d H:i:s', new Date())
        db.collection('events').add(this.event)
          .then(() => {
            this.event.title = ''
            this.event.description = ''
            this.event.date = ''
            this.event.startTime = ''
            this.event.endTime = ''
            this.$swal({
              title: 'Data Berhasil Disimpan',
              icon: 'success'
            })
            this.$refs['modal'].hide()
            console.log('Berhasil Disimpan!')
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.$swal({
          title: 'Data Belum Diisi',
          icon: 'error'
        })
      }
    }
  }
}
</script>
