<template>
  <div>
    <b-modal ref="detail" centered>
      <template v-slot:modal-title>
        <span contenteditable="true" @blur="updateNote($event, note, 'title')">{{ note.title }}</span>
      </template>
      <div contenteditable="true" @blur="updateNote($event, note, 'content')" v-html="note.content"></div>
      <template v-slot:modal-footer="{ close }">
        <b-button size="sm" variant="danger" @click="close()">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import jsDate from 'js-date'
import { db } from '../main'
export default {
  name: 'DetailNote',
  data () {
    return {
      note: ''
    }
  },
  methods: {
    modal (note) {
      this.note = note
      this.$refs['detail'].show()
    },
    updateNote (event, note, type) {
      let updateNote = ''
      if (type === 'title') {
        updateNote = {
          title: event.target.innerText,
          updatedAt: jsDate.date('Y-m-d H:i:s', new Date())
        }
      } else if (type === 'content') {
        updateNote = {
          content: event.target.innerHTML,
          updatedAt: jsDate.date('Y-m-d H:i:s', new Date())
        }
      }
      // console.log(updateNote)
      db.collection('notes').doc(note.id)
        .update(updateNote)
        .then(() => {
          console.log('Note successfully updated')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
  [contenteditable=true]:focus{

  overflow: hidden;
  border: 1px solid transparent;

  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  white-space: nowrap;
  border-radius: 10px;

  width: 100%;
}
</style>
