<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Nyateti'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Amatic+SC|Short+Stack&display=swap');
:root {
    --ck-z-default: 100;
    --ck-z-modal: calc( var(--ck-z-default) + 999 );
}
html, body{
  width: 100%;
  height: 100%;
  background-color: #f0f0f0 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.font-amatic{
  font-family: 'Amatic SC', cursive;
}
.text-title{
  font-family: 'Short Stack', cursive;
}
.text-desc{
  font-family: 'Amatic SC', cursive;
  font-size: 120% !important;
  letter-spacing: 2px;
}
/* modal notes */
.modal-full
.modal-dialog {
    width: 100%;
    height: 100%;
}
.modal-full
.modal-content {
    height: 100%;
    border-radius: 0;
    color:#333;
    overflow:auto;
}
.ck-editor__editable {
    min-height: 50vh;
}
</style>
