<template>
  <v-container fluid>
    <v-row class="justify-center">
      <!--  уведомлялка    -->
      <v-snackbar
        v-model="snackbar.on"
        top
        :timeout=2000
      >{{snackbar.msg}}
        <v-btn color="primary" text @click="snackbar.on = false">Close</v-btn>
      </v-snackbar>
      <v-col cols="12" sm="12" md="8">
        <ScheduleForm v-model="showScheduleForm"/>
        <v-card>
          <v-card-title>
            Модели
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Поиск"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            @click:row="onClickRow"
            :headers="headers"
            :items="list_models"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="primary" large @click.stop="showScheduleForm=true">Добавить Модель</v-btn>
  </v-container>
</template>

<script>
import { bus } from '../main';
import ScheduleForm from "./ScheduleForm";
    export default {
      name: "ListModels",
      data: () => ({
          showScheduleForm: false,
          snackbar: {
            on:false,
            msg:''
          },
          search: '',
          headers: [
            { text: 'Модель',align: 'left',value: 'name'},
            { text: 'Производитель', value: 'man_info.name'},
          ]
      }),
      components: {
        ScheduleForm
      },
      computed : {
        list_models() {
          return this.$store.state.models;
        },
      },
      methods: {
        snackbar_notice(str) {
          this.snackbar.on = true;
          this.snackbar.msg = str;
          this.showScheduleForm=false
        },
        onClickRow(row) {
          // console.log(row.name)
          // this.$router.push({ name: 'ProductPage', params: { id : this.result.id } });
        },
        addModel(data){
          fetch('http://localhost:3000/api/models', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
          }).then((res) => {
             if (res.status == 200) {
               this.snackbar_notice('Продукт добавлен');
             }
             else {
               this.snackbar_notice('Ошибка добавления продукта');
             }
          })
        }
      },
      created() {
        bus.$on('input', (data) => {
          this.addModel(data)
        })
      }
    }
</script>

<style scoped>

</style>
