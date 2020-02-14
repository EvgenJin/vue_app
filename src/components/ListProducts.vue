<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10">
        <v-tabs
          fixed-tabs
          background-color="primary"
        >
          <v-tab @click.stop="transfer_sellected">
            Переместить выбранные
          </v-tab>
        </v-tabs>
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
            v-model="selected"
            show-select
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
                selected: [],
                headers: [
                    { text: 'Тип',align: 'left',value: 'type'},
                    { text: 'Модель',align: 'left',value: 'model_name'},
                    { text: 'Производитель', value: 'man_name' },
                    { text: 'Серийный номер', value: 'serial_num' },
                    { text: 'Инвентарный номер', value: 'inventory_num' },
                    { text: 'Хранение', value: 'store_name' },
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
              console.log(row)
              // this.$router.push({ name: 'ProductPage', params: { id : this.result.id } });
            },
            transfer_sellected() {
              if (this.selected.length > 0) {
                this.selected.forEach(el => {
                  console.log(el.model)
                })
              }
            }
        },
        mounted() {
        }
    }
</script>
