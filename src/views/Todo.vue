<template>
    <div>
        <AppHeader />
        <b-container class="main bg-white rounded-bottom pt-4">
            <h1 class="text-center">Todo List</h1>
            <b-row class="mt-3">
                <b-col v-if="!todos.length" cols="12">
                  <h1 class="text-center text-muted font-amatic">Belum ada tugas...</h1>
                </b-col>
                <b-col v-for="(todo, id) in todos" :key="id" cols="12" class="pb-3">
                    <b-card class="border-danger">
                        <b-row>
                            <b-col cols="2" class="d-flex justify-content-center align-items-center">
                                <b-form-checkbox @change="checkTodo(todo)" v-model="todo.done" class="check-todo"></b-form-checkbox>
                            </b-col>
                            <b-col cols="8" class="px-0 pt-1">
                                <h5 class="p-1 m-0"
                                contenteditable="true"
                                @keydown.enter="updateTodo($event, todo)"
                                @blur="updateTodo($event, todo)"
                                :class="{complete: todo.done}">
                                {{ todo.title }}
                                </h5>
                            </b-col>
                            <b-col cols="2" class="d-flex justify-content-center align-items-center">
                                <b-button @click.stop="removeTodo(todo.id)" variant="outline-secondary" class="pt-2">
                                    <b-icon-trash></b-icon-trash>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="add-todo bg-danger text-white py-3">
            <b-form @submit.prevent="simpan" inline>
                <b-input-group class="mb-2 mb-sm-0 w-100">
                    <b-input v-model="todo" placeholder="Masukkan Tugas..."></b-input>
                    <b-button type="submit" class=rounded-right squared variant="success">Add</b-button>
                </b-input-group>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader'
import { db } from '../main'
import jsDate from 'js-date'
export default {
  name: 'Todo',
  data () {
    return {
      module: {
        checked: true,
        id: '1212'
      },
      todos: [],
      todo: ''
    }
  },
  components: {
    AppHeader
  },
  firestore () {
    return {
      todos: db.collection('tasks')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', this.$store.getters.user.data.uid)
    }
  },
  // created () {
  //   db.collection('tasks')
  //     .where('userId', '==', this.$store.getters.user.data.uid)
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(querySnapshot => {
  //       let todos = []
  //       querySnapshot.forEach(doc => {
  //         let todo = doc.data()
  //         todo.id = doc.id
  //         todos.push(todo)
  //       })
  //       this.todos = todos
  //     })
  // },
  methods: {
    simpan () {
      if (this.todo !== '') {
        db.collection('tasks').add({
          title: this.todo,
          done: false,
          userId: this.$store.getters.user.data.uid,
          createdAt: jsDate.date('Y-m-d H:i:s', new Date()),
          updatedAt: '0000-00-00 00:00:00'
        }).then(() => {
          console.log('Berhasil disimpan')
        }).catch((e) => {
          console.log(e)
        })
        this.todo = ''
      }
    },
    checkTodo (todo) {
      // console.log(todo.id)
      db.collection('tasks').doc(todo.id).update({
        done: !todo.done,
        updatedAt: jsDate.date('Y-m-d H:i:s', new Date())
      }).then(() => {
        console.log('OK')
      }).catch((e) => {
        console.log(e)
      })
    },
    updateTodo (e, todo) {
      e.preventDefault()
      db.collection('tasks').doc(todo.id).update({
        title: e.target.innerText,
        updatedAt: jsDate.date('Y-m-d H:i:s', new Date())
      }).then(() => {
        console.log(e.target.innerText)
        e.target.blur()
      }).catch((e) => {
        console.log(e)
      })
    },
    removeTodo (id) {
      db.collection('tasks').doc(id).delete()
        .then(() => {
          console.log('Berhasil dihapus')
        }).catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.main{
    min-height: calc(100vh - 50px);
    padding-bottom: 10vh !important;
}
.add-todo{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top-right-radius: 1rem !important;
    border-top-left-radius: 1rem !important;
}
.rounded-right{
    border-top-right-radius: 0.25rem !important;
    border-bottom-right-radius: 0.25rem !important;
}
.input-group .form-control{
  height: 3em;
}
.check-todo{
    transform: scale(2);
}
.complete{
  text-decoration: line-through;
}
/* input[type=text].error{border: 1px solid red;} */
[contenteditable=true]:focus{

  overflow: hidden;
  border: 1px solid transparent;

  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  white-space: nowrap;
  border-radius: 10px;

}
</style>
