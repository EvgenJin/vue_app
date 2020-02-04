-<template>
  <v-app id="app">
    <!-- <div id="app"> -->
        <v-content>
            <router-view/>
        </v-content>
      <!-- <router-view/> -->
    <!-- </div> -->
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*background: url( 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg') no-repeat center center;*/
  /*color: #2c3e50;*/
  /* margin-top: 60px; */
}
</style>
