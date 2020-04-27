<template>
    <div>
        <div class="bg-top"></div>
        <AppHeader></AppHeader>
        <div class="main h-100">
            <b-container class="h-25 d-flex flex-column justify-content-center pt-5">
                <h3 class="text-center text-white text-desc mt-5">Nulis apa hari ini?</h3>
            </b-container>
            <b-container class="form-note bg-white rounded-top py-3">
                <b-card class="h-100" footer-tag="footer">
                    <b-form-input
                    v-model="note.title"
                    class="mb-3"
                    placeholder="Judul...">
                    </b-form-input>
                    <ckeditor v-model="note.content" :editor="editor" :config="editorConfig"></ckeditor>
                    <template v-slot:footer>
                        <b-button @click="save()" class="font-amatic btn-block float-right" variant="success">Simpan</b-button>
                    </template>
                </b-card>
            </b-container>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import jsDate from 'js-date'
import { db } from '../main'
export default {
  name: 'TambahNotes',
  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: 'Tulis catatan...'
      },
      note: {
        title: '',
        content: '',
        userId: '',
        createdAt: '',
        updatedAt: '0000-00-00 00:00:00'
      }
    }
  },
  components: {
    AppHeader
  },
  methods: {
    save () {
      // set data
      this.note.createdAt = jsDate.date('Y-m-d H:i:s', new Date())
      this.note.userId = this.$store.getters.user.data.uid
      if (this.note.title !== '' && this.note.content !== '') {
        db.collection('notes')
          .add(this.note)
          .then(() => {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Catatan berhasil disimpan!'
            }).then(() => {
              this.$router.push('/notes')
            })
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }
}
</script>

<style scoped>
.bg-top{
    position: relative;
    height: 20rem;
    background-color: #dc3545;
}
.main{
    position: absolute;
    /* top: 7.5rem; */
    left: 0;
    right: 0;
    bottom: 0;
}
.card{
    border: none;
}
.card-body{
    padding: 0 !important;
}
.card-footer{
    background: none !important;
    padding-right: 0;
    padding-left: 0;
}
.text-desc{
    font-size: 2.5rem !important;
}
.font-amatic{
    font-weight: bold;
    letter-spacing: 5px;
}
.rounded-top{
  border-top-right-radius: 1rem !important;
  border-top-left-radius: 1rem !important;
}
.form-note{
    min-height: 75% !important;
}
</style>
