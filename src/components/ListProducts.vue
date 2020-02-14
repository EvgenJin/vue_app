<template>
  <v-container fluid>
    <ProductPage/>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10">
        <v-card>
          <!-- tabs -->
          <v-tabs v-model="tab" background-color="primary" centered icons-and-text>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">Список<v-icon>devices</v-icon></v-tab>
            <v-tab href="#tab-2">Корзина<v-icon>shopping_cart</v-icon></v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
              <!--  content 1 tab  -->
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
            </v-tab-item>
            <v-tab-item :value="'tab-2'">
              <!--  content 2 tab  -->
              <v-card>
                <v-card-title>
                  Выбрано
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
                  :headers="headers"
                  :items="selected"
                  :search="search"
                ></v-data-table>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        <!--under tabs-->
        <v-tabs
          fixed-tabs
          background-color="primary"
        >
          <v-tab>
            Выбрано объектов: {{selected.length}}
          </v-tab>
          <v-tab @click.stop="transfer_sellected">
            Переместить выбранные
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import { bus } from '../main';
    import ProductPage from "./ProductPage";
    export default {
        components: {ProductPage},
        data () {
            return {
                drawer:true,
                tab: null,
                text: 'Lorem ipsum dolor sit amet,',
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
        components: {
            ProductPage
        },
        computed : {
            list_products() {
                return this.$store.state.products;
            },
        },
        methods: {
            onClickRow(row) {
                bus.$emit('callProductPage',row.id)
              // console.log(row)
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
