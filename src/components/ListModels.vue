<!--страница списка моделей (справочник)-->
<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="8">
        <AddModel/>
        <AddManufacturer/>
        <v-card>
          <v-tabs
            fixed-tabs
            background-color="primary"
          >
            <v-tab @click.stop="callManufacturersAdd">
              Добавить Производителя
            </v-tab>
            <v-tab @click.stop="callModelAdd">
              Добавить Модель
            </v-tab>
          </v-tabs>
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
        callManufacturersAdd () {
            bus.$emit('callManufacturersAdd')
        },
        callModelAdd () {
            bus.$emit('callModelAdd')
        }
      },
      created() {
      }
    }
</script>

<style scoped>

</style>
