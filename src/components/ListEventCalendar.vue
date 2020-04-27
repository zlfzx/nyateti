<template>
  <div class="mx-2">
    <b-row>
      <b-col v-if="events.length == 0" cols="12" class="mb-3">
        <b-card>
          <h1 class="text-center text-muted font-amatic">Belum ada event...</h1>
        </b-card>
      </b-col>
      <b-col v-else v-for="(event, id) in events" :key="id" cols="12" class="mb-3">
        <b-card>
          <b-row>
            <b-col cols="10">
              <h4>{{ event.title }}</h4>
              <h5 class="text-muted">{{ event.description }}</h5>
              <b-badge variant="warning">
                <b-icon-alarm></b-icon-alarm>
                {{ event.startTime | jam }} - {{ event.endTime | jam }}
              </b-badge>
            </b-col>
            <b-col cols="2" class="d-flex align-items-center justify-content-center">
              <b-button variant="danger" @click="deleteEvent(event.id)"><b-icon-trash></b-icon-trash></b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'ListEventCalendar',
  props: ['events'],
  filters: {
    jam (value) {
      return value.substr(0, 5)
    }
  },
  methods: {
    deleteEvent (id) {
      db.collection('events').doc(id).delete()
        .then(() => {
          console.log('Berhasil dihapus')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
