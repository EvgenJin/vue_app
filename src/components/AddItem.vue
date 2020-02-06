<template>
  <v-container fluid>
    <v-row class="justify-center">
      <snackbar_alert/>
      <v-col cols="12" xs="12" md="10">
        <v-card shaped>
          <v-card-title class="justify-center">ТМЦ</v-card-title>
          <v-card-subtitle>Добавить технику</v-card-subtitle>
          <v-list-item dense>
            <v-list-item-content>
            <v-row>
              <v-col cols="12" xs="12" sm="6">
              <v-select
                v-model="product.manufacturer"
                :items="list_manufacturers"
                item-text="name"
                label="Производитель"
                outlined return-object>
              </v-select>
              </v-col>
              <v-col cols="12" xs="12" sm="6">
                <v-select
                  v-model="product.model"
                  :items="list_products"
                  label="Модель"
                  outlined
                ></v-select>
              </v-col>
                <v-col cols="12" xs="12" sm="6">
                  <v-text-field v-model="product.serial_num" class="styled-input" label="Серийный номер" outlined></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6">
                  <v-text-field v-model="product.inventory_num" label="Инвентарный номер" outlined></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6">
                  <v-text-field v-model="product.ip_addr" label="ip адрес" outlined></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6">
                  <v-text-field v-model="product.mac_addr" label="mac адрес" outlined></v-text-field>
                </v-col>
                <v-col xs="12">
                  <v-select
                    v-model="product.storage"
                    :items="list_storages"
                    label="Склад"
                    item-text="address"
                    outlined return-object
                  ></v-select>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row class="justify-center">
              <v-btn color="primary" @click="handleSubmit()">Добавить на склад</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { bus } from '../main';
import snackbar_alert from "./common/snackbar_alert";
    export default {
        data: () => ({
          name: "Product"
          ,product: {
            manufacturer: {id:null, name:null},
            model: null,
            serial_num: null,
            inventory_num: null,
            ip_addr:null,
            mac_addr:null,
            storage: {id:null, name:null, address:null}
          },
          alert_notice: {
            message: null,
            on: false,
            type: "error",
            type_error: null
          },
        }),
        components: {
          snackbar_alert
        },
        computed : {
          list_manufacturers() {
            return this.$store.state.manufacturer.map(product => ({id:product.id,name:product.name}))
          },
          list_products() {
            return this.$store.state.models.filter(res => res.manufacturer_id === this.product.manufacturer.id).map(product => product.name);

          },
          list_storages() {
            return this.$store.state.stores.map(res => ({id:res.id, name:res.name, address:res.address}))
          }
        },
        mounted() {
            this.drawer = false;
        }
        , methods: {
          test () {
            this.set_notice('hah','error')
          },
          erase_form() {
            this.product = {
              manufacturer:{},
              storage: {}
            }
          },
          handleSubmit() {
            let product_object = {
              model: this.product.model,
              manufacturer_id: this.product.manufacturer.id,
              serial_num: this.product.serial_num,
              inventory_num: this.product.inventory_num,
              ip_addr: this.product.ip_addr,
              store_to: this.product.storage.id,
              user: this.$store.getters.login
            };
            fetch('http://localhost:3000/api/products', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(product_object)
            }).then((res) => {
              if (res.status == 200) {
                this.set_notice('Продукт добавлен','success')
                this.erase_form();
              }
              if (res.status == 500) {
                this.set_notice('Ошибка добавления Продукта','error')
              }
            })
          },
          set_notice(str,type) {
            bus.$emit('snackbar_alert',{str:str,type:type});
          }
        }
    }
</script>

<style scoped>

</style>
