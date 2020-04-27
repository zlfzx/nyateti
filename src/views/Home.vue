<template>
    <div>
      <div class="bg">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#dc3545" fill-opacity="1" d="M0,96L30,85.3C60,75,120,53,180,85.3C240,117,300,203,360,229.3C420,256,480,224,540,197.3C600,171,660,149,720,165.3C780,181,840,235,900,261.3C960,288,1020,288,1080,266.7C1140,245,1200,203,1260,170.7C1320,139,1380,117,1410,106.7L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg> -->
        <div></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#dc3545" fill-opacity="1" d="M0,128L26.7,122.7C53.3,117,107,107,160,133.3C213.3,160,267,224,320,245.3C373.3,267,427,245,480,202.7C533.3,160,587,96,640,106.7C693.3,117,747,203,800,213.3C853.3,224,907,160,960,133.3C1013.3,107,1067,117,1120,149.3C1173.3,181,1227,235,1280,240C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
      </div>
      <div class="main">
        <b-container class="text-center">
          <img src="@/assets/img/icon.svg" class="logo mt-4" alt="">
          <h1 class="text-white text-title">nyateti</h1>
          <b-badge pill variant="warning" class="text-desc">Nanti Kita Catat Tentang Hari Ini</b-badge>
          <b-container class="bg-white rounded my-4 px-4 py-2">
            <b-row>
              <b-col cols="6" class="my-3">
                <b-card @click="route('notes')" border-variant="danger" class="shadow">
                  <img src="@/assets/img/notes.svg" class="icon" alt="">
                  <h4 class="jns-text">Notes</h4>
                </b-card>
              </b-col>
              <b-col cols="6" class="my-3">
                <b-card @click="route('todo')" border-variant="danger" class="shadow">
                  <img src="@/assets/img/todo.svg" class="icon" alt="">
                  <h4 class="jns-text">Todo</h4>
                </b-card>
              </b-col>
              <b-col cols="6" class="my-3">
                <b-card @click="route('calendar')" border-variant="danger" class="shadow">
                  <img src="@/assets/img/calendar.svg" class="icon" alt="">
                  <h4 class="jns-text">Calendar</h4>
                </b-card>
              </b-col>
              <b-col cols="6" class="my-3">
                <b-card @click="route('routines')" border-variant="danger" class="shadow">
                  <img src="@/assets/img/daily.svg" class="icon" alt="">
                  <h4 class="jns-text">Routines</h4>
                </b-card>
              </b-col>
              <b-col cols="12" class="my-3">
                <b-card @click="route('profil')" border-variant="danger" class="shadow">
                  <h2 class="font-amatic"><b-icon-people-circle></b-icon-people-circle> Profil</h2>
                </b-card>
              </b-col>
            </b-row>
          </b-container>
        </b-container>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    route (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
  .bg{
    position: relative;
  }
  .bg div{
    widows: 100vw;
    height: 20rem;
    background-color: #dc3545;
  }
  .main{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
  }
  .text-desc{
    font-weight: bold !important;
  }
  .logo{
    width: 200px;
  }
  .rounded{
    border-radius: 1rem !important;
  }
  .icon{
    width: 40%;
  }
  .jns-text{
    margin-top: 15px;
    font-size: 110%;
    font-family: 'Amatic SC', cursive;
    font-weight: bold;
  }
</style>
