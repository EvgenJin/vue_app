<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-card-title>
            Техника
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
            :items="list_products"
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
                    { text: 'Модель',align: 'left',value: 'model'},
                    { text: 'Производитель', value: 'man_info.name' },
                    { text: 'Серийный номер', value: 'serial_num' },
                    { text: 'Инвентарный номер', value: 'inventory_num' },
                    { text: 'ip адрес', value: 'ip_addr' }
                ]
            }
        },
        computed : {
            list_products() {
                return this.$store.state.products;
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
