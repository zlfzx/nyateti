<template>
    <div>
        <AppHeader></AppHeader>
        <div class="bg-top"></div>
        <div class="main">
            <b-container class="py-5">
                <div class="d-flex flex-column justify-content-center align-items-center pb-5">
                    <h1 class="font-amatic text-center text-white">Routines</h1>
                    <b-button variant="light" @click="addRoutine"><b-icon-plus></b-icon-plus> Tambah</b-button>
                </div>

                <AddRoutine ref="addRoutine"></AddRoutine>

                <b-container class="bg-white rounded p-4 vh-50">
                   <ListRoutines></ListRoutines>
                </b-container>
            </b-container>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader'
import AddRoutine from '@/components/AddRoutine'
import ListRoutines from '@/components/ListRoutines'
export default {
  name: 'Routines',
  components: {
    AppHeader,
    AddRoutine,
    ListRoutines
  },
  methods: {
    addRoutine () {
      this.$refs['addRoutine'].modal('show')
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
.font-amatic{
    letter-spacing: 10px;
}
.vh-50{
    min-height: 50vh;
}
</style>
