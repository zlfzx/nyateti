<template>
    <div>
      <AppHeader></AppHeader>
      <div class="bg-top"></div>
      <div class="main">
        <div class="d-flex justify-content-center my-5">
          <h1 class="text-center text-white font-amatic">Calendar</h1>
        </div>
        <b-container class="bg-white rounded p-3 mt-5">
          <b-calendar v-model="event" block
            locale="id-ID"
            class="mb-3"
            selected-variant="danger"
            @context="onContext"
            @selected="pilihTanggal">
          </b-calendar>
          <div class="d-flex justify-content-end mb-3">
            <b-button @click="addEvent" variant="outline-success">Add Event</b-button>
          </div>

          <!-- Modal add event -->
          <AddEventCalendar ref="add"></AddEventCalendar>

          <!-- <b-row> -->
          <ListEventCalendar :events="events"></ListEventCalendar>
          <!-- </b-row> -->
        </b-container>
      </div>
    </div>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader'
import AddEventCalendar from '@/components/AddEventCalendar'
import ListEventCalendar from '@/components/ListEventCalendar'
import { db } from '../main'
import jsDate from 'js-date'
export default {
  name: 'Calendar',
  data () {
    return {
      event: '',
      context: null,
      events: []
    }
  },
  firestore () {
    return {
      events: db.collection('events')
        .where('userId', '==', this.$store.state.user.data.uid)
        .where('date', '==', jsDate.date('Y-m-d', new Date()))
        .orderBy('createdAt', 'desc')
    }
  },
  methods: {
    onContext (ctx) {
      this.context = ctx
    },
    addEvent () {
      this.$refs['add'].modal(this.context.activeYMD)
      // console.log(this.$refs['add'])
    },
    pilihTanggal () {
      // console.log(this.events)
      db.collection('events')
        .where('userId', '==', this.$store.state.user.data.uid)
        .where('date', '==', this.context.activeYMD)
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          let events = []
          querySnapshot.forEach(doc => {
            let event = doc.data()
            console.log(doc.data())
            event.id = doc.id
            events.push(event)
          })
          this.events = events
        })
    }
  },
  components: {
    AppHeader,
    AddEventCalendar,
    ListEventCalendar
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
</style>
