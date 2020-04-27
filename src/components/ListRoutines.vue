<template>
  <div>
    <div v-if="!routines.length" class="d-flex justify-content-center align-items-center empty-routine">
      <h5 class="text-center text-muted font-amatic font-weight-bolder">Belum ada rutinitas, mulai tambah yuk...</h5>
    </div>
    <b-card-group v-else columns>
      <b-card v-for="(routine, id) in routines" :key="id">
        <b-row>
          <b-col cols="9">
            <b-card-title>{{ routine.title }}</b-card-title>
            <b-card-text><b-icon-alarm></b-icon-alarm> {{ routine.startTime | jam }} - {{ routine.endTime | jam }}</b-card-text>
            <h5><b-badge variant="warning">Main Game</b-badge></h5>
          </b-col>
          <b-col cols="3" class="d-flex align-items-center">
            <b-button @click="deleteRoutine(routine.id)" variant="danger" class="float-right"><b-icon-trash></b-icon-trash></b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'ListRoutines',
  data () {
    return {
      routines: []
    }
  },
  firestore () {
    return {
      routines: db.collection('routines')
        .where('userId', '==', this.$store.getters.user.data.uid)
        .orderBy('startTime', 'asc')
    }
  },
  filters: {
    jam (value) {
      return value.substr(0, 5)
    }
  },
  methods: {
    deleteRoutine (id) {
      db.collection('routines').doc(id).delete()
        .then(() => {
          this.$swal({
            title: 'Berhasil Dihapus',
            icon: 'success'
          })
          console.log('Berhasil Dihapus')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.empty-routine{
    height: 50vh;
}
</style>
