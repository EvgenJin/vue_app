<!--страница добавления производителя-->
<template>
  <v-dialog
    v-model="show"
    max-width="800px">
    <snackbar_alert/>
    <v-container>
      <v-card>
        <v-card-title class="justify-center">Производитель</v-card-title>
        <v-card-subtitle>Добавить</v-card-subtitle>
        <v-row class="justify-center">
            <v-col sm="10">
              <v-text-field
                v-model="manufacturer.name"
                label="Производитель"
                outlined
              />
            </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="submit">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
import snackbar_alert from "./common/snackbar_alert";
import {bus} from "../main";
    export default {
      name: "AddManufacturer",
      data:() =>({
        show: false,
        active:false,
        manufacturer: {
          name:''
        }
      })
      ,methods: {
        submit() {
          if (this.list_manufacturers.includes(this.manufacturer.name)) {
            bus.$emit('snackbar_alert',{str:'Производитель '+ this.manufacturer.name +' уже добавлен',type:'error'});
            this.manufacturer.name = ''
          }
          else {
              fetch('http://localhost:3000/api/manufacturers', {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(this.manufacturer)
              }).then((res) => {
                  if (res.status == 200) {
                      bus.$emit('snackbar_alert',{str:'Производитель добавлен',type:'success'});
                      this.$store.dispatch('set_manufacturer');
                      this.manufacturer.name = ''
                  }
                  if (res.status == 500 || res.status == 400) {
                      bus.$emit('snackbar_alert',{str:'Ошибка добавления Производителя',type:'error'});
                  }
              })
          }

        }
      }
      ,computed: {
        list_manufacturers() {
          return this.$store.state.manufacturer.map(product => product.name)
        },
      }
      ,components: {
        snackbar_alert
      },
      created() {
          bus.$on('callManufacturersAdd', (data) => {
              this.show = true;
          })
      }
    }
</script>

<style scoped>

</style>
