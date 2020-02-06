<template>
  <v-snackbar
    v-model="snackbar.on"
    top
    :color="snackbar.color"
    :timeout=2000
  >{{snackbar.msg}}
    <v-btn text @click="snackbar.on = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import { bus } from '../../main'
  export default {
    name: "ListModels",
    data: () => ({
      snackbar: {
        color: "success", // info error
        on: false,
        msg: ''
      }
    })
    ,created() {
      bus.$on('snackbar_alert', (obj) => {
        this.snackbar.on = true;
        this.snackbar.msg = obj.str;
        this.snackbar.color = obj.type;
      })
    }
  }
</script>

<style scoped>

</style>
