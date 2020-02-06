<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="8">
        <AddModel v-model="showAddModel"/>
        <AddManufacturer v-model="showAddManufacturer"/>
        <v-btn color="primary" large @click.stop="showAddManufacturer=true">Добавить Производителя</v-btn>
        <v-btn color="primary" large @click.stop="showAddModel=true">Добавить Модель</v-btn>
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
            :headers="headers"
            :items="list_models"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { bus } from '../main';
import AddModel from "./AddModel";
import AddManufacturer from "./AddManufacturer";

    export default {
      name: "ListModels",
      data: () => ({
          showAddModel: false,
          showAddManufacturer:false,
          search: '',
          headers: [
            { text: 'Модель',align: 'left',value: 'name'},
            { text: 'Производитель', value: 'man_info.name'},
          ]
      }),
      components: {
        AddManufacturer,
        AddModel
      },
      computed : {
        list_models() {
          return this.$store.state.models;
        },
      },
      methods: {
        addModel(data){
          fetch('http://localhost:3000/api/models', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
          }).then((res) => {
             if (res.status == 200) {
               // this.snackbar_notice('Продукт добавлен');
             }
             else {
               // this.snackbar_notice('Ошибка добавления продукта');
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
