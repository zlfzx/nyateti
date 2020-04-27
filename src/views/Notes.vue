<template>
    <div>
        <app-header></app-header>
        <div class="bg-top"></div>
        <div class="main">
            <b-container class="py-5">
                <div class="d-flex flex-column justify-content-center align-items-center pb-5">
                    <h1 class="font-amatic text-center text-white">Notes</h1>
                    <b-button variant="light" to="/tambah-notes"><b-icon-plus></b-icon-plus> Tambah</b-button>
                </div>

                <b-container class="bg-white rounded p-4">
                    <div v-if="!notes.length" class="d-flex justify-content-center align-items-center empty-notes">
                        <h5 class="text-center text-muted font-amatic font-weight-bolder">Belum ada catatan, mulai nulis yuk...</h5>
                    </div>
                    <b-card-group v-else columns>
                        <b-card v-for="(note, id) in notes" :key="id" @click="detail(note)" footer-tag="footer">
                            <b-card-title>{{ note.title }}</b-card-title>
                            <b-card-text class="text-muted" v-html="preContent(note.content)"></b-card-text>
                            <template v-slot:footer>
                                <small class="text-muted"><em>{{ note.createdAt | date }}</em></small>
                                <b-button @click.stop="deleteNote(note.id)" size="sm" variant="outline-danger"><b-icon-trash></b-icon-trash></b-button>
                            </template>
                        </b-card>
                    </b-card-group>

                    <DetailNote ref="detail"></DetailNote>
                </b-container>
            </b-container>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader'
import DetailNote from '@/components/DetailNote'
import { db } from '../main'
import jsDate from 'js-date'
export default {
  name: 'Notes',
  components: {
    AppHeader,
    DetailNote
  },
  data () {
    return {
      notes: [],
      note_detail: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    preContent (text) {
      if (text.length > 50) {
        return text.substr(0, 50) + ' ....'
      } else {
        return text.substr(0, 50)
      }
    },
    detail (note) {
      this.$refs['detail'].modal(note)
      // return alert(val)
    },
    deleteNote (id) {
      this.$swal({
        title: 'Hapus Catatan',
        text: 'Anda ingin menghapus catatan?',
        icon: 'question',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        showCancelButton: true,
        cancelButtonColor: '#dc3545'
      }).then(hapus => {
        if (hapus.value) {
          console.log(id)
          db.collection('notes').doc(id).delete()
            .then(() => {
              this.$swal({
                title: 'Berhasil',
                text: 'Catatan berhasil dihapus!',
                icon: 'success'
              })
            })
        } else {
          console.log('Batal dihapus')
        }
      })
    }
  },
  firestore () {
    return {
      notes: db.collection('notes').where('userId', '==', this.$store.getters.user.data.uid).orderBy('createdAt', 'desc')
    }
  },
  // created () {
  //   db.collection('notes')
  //     .where('userId', '==', this.$store.getters.user.data.uid)
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(querySnapshot => {
  //       let notes = []
  //       querySnapshot.forEach(doc => {
  //         let note = doc.data()
  //         note.id = doc.id
  //         notes.push(note)
  //       })
  //       this.notes = notes
  //     })
  // },
  filters: {
    date (date) {
      return jsDate.date('l, d M Y', new Date(date))
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
/* @media (max-width:576px){
    .card-columns{
        -webkit-column-count:2;
        -moz-column-count:2;
        column-count:2;
        -webkit-column-gap:1.25rem;
        -moz-column-gap:1.25rem;
        column-gap:1.25rem;
        orphans:1;
        widows:1
    }
} */
.font-amatic{
    letter-spacing: 10px;
}
.empty-notes{
    height: 50vh;
}
.card-columns{
    min-height: 50vh;
}
/* .card-columns .card{
    display: inline-block;
} */
.card-body{
    padding-bottom: 0;
}
.card-footer{
    background-color: #fff;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
}
</style>
