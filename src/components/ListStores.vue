<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10">
      <v-card>
        <v-card-title>
          Склады
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
          :items="list_storages"
          :search="search"
        ></v-data-table>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        data () {
            return {
                search: '',
                headers: [
                    {text: 'Адрес',align: 'left',value: 'address'},
                    { text: 'Наименование', value: 'name' },
                    { text: 'Телефон (g)', value: 'telephone' },
                    { text: 'Почта (g)', value: 'email' },
                    { text: 'Начальник', value: 'chief_name' },
                ]
            }
        },
        computed : {
          list_storages() {
              return this.$store.state.stores;
          },
        },
        methods: {
            onClickRow(row) {
                console.log(row.id)
            }
        },
        mounted() {
        }
    }
</script>
