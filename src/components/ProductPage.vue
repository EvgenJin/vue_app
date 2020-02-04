<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-btn color="accent" large @click.stop="showScheduleForm=true"/>
        <ScheduleForm v-model="showScheduleForm" />
      <v-col cols="12" sm="12" md="8">
        <v-card shaped>
          <v-card-title class="justify-center">ТМЦ</v-card-title>
          <v-card-subtitle>Описание</v-card-subtitle>
          <v-list-item dense>
            <v-list-item-content>
              <v-row>
                <v-col sm="6">
                  <v-select
                    v-model="product.man_info"
                    :items="list_manufacturers"
                    item-text="name"
                    label="Производитель"
                    outlined
                    return-object
                    :readonly=!switch_update
                  />
                </v-col>
                <v-col sm="6">
                  <v-select
                    v-model="product.model"
                    :items="list_products"
                    label="Модель"
                    outlined
                    :readonly=!switch_update
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6">
                  <v-text-field
                    v-model="product.serial_num"
                    class="styled-input"
                    label="Серийный номер"
                    outlined
                    :readonly=!switch_update
                  />
                </v-col>
                <v-col sm="6">
                  <v-text-field
                    v-model="product.inventory_num"
                    label="Инвентарный номер"
                    outlined
                    :readonly=!switch_update
                  />
                </v-col>
                <v-col sm="6">
                  <v-text-field
                    v-model="product.ip_addr"
                    label="ip адрес"
                    outlined
                    :readonly=!switch_update
                  />
                </v-col>
                <v-col sm="6">
                  <v-text-field
                    v-model="product.mac_addr"
                    label="mac адрес"
                    outlined
                    :readonly=!switch_update
                  />
                </v-col>
                <v-col sm="12">
                  <v-select
                    v-model="product.storage"
                    :items="list_storages"
                    label="Склад"
                    disabled
                    item-text="address"
                    outlined return-object
                  ></v-select>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row class="justify-center">
              <v-col sm="4">
                <v-switch
                  v-model="switch_update"
                  label="обновить"
                ></v-switch>
              </v-col>
              <v-col sm="4">

              </v-col>
              <v-col sm="4">
                <v-switch
                  v-model="switch_transfer"
                  label="переместить"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-row class="justify-center" v-if="switch_transfer">
            <v-col sm="12">
              <v-select
                v-model="new_storage"
                :items="list_storages"
                label="Переместить на склад"
                item-text="address"
                outlined return-object
              ></v-select>
            </v-col>
            <v-btn :disabled="!allow_transfer" @click="transfer">Переместить</v-btn>
          </v-row>
          <v-row class="justify-center" v-if="switch_update">
            <v-btn @click="update">Обновить</v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { bus } from '../main';
import ScheduleForm from "./ScheduleForm";
    export default {
        name: "ProductPage",
        data: () => ({
            showScheduleForm: false,
            product: {
                man_info:{}
            },
            new_storage:{},
            switch_update:false,
            switch_transfer:false
        }),

        computed : {
            list_manufacturers() {
                return this.$store.state.manufacturer.map(product => ({id:product.id,name:product.name}))
            },
            list_products() {
                return this.$store.state.models.filter(res => res.manufacturer_id === this.product.man_info.id).map(product => product.name);
            },
            list_storages() {
                return this.$store.state.stores.map(res => ({id:res.id, name:res.name, address:res.address}))
            },
            allow_transfer() {
                return this.product.storage.id !== this.new_storage.id;
            }
        },
        methods : {
            transfer() {
                let product_transfer = {
                    model: this.product.model,
                    manufacturer_id: this.product.manufacturer_id,
                    serial_num: this.product.serial_num,
                    inventory_num: this.product.inventory_num,
                    ip_addr:this.product.ip_addr,
                    store_id:this.new_storage.id
                };
                let transfer = {
                    store_from:this.product.storage.id,
                    store_to:this.new_storage.id
                };
            },
            update() {
            },
            init() {
                fetch('http://localhost:3000/api/products/2').then(res => res.json())
                    .then(res => {
                        this.product.man_info = res.man_info;
                        this.product.model = res.model;
                        this.product.serial_num = res.serial_num;
                        this.product.inventory_num = res.inventory_num;
                        this.product.ip_addr = res.ip_addr;
                        this.product.storage = res.store_info;
                    })
            }
        },

        components: {
            ScheduleForm
        },
        mounted() {
          this.init();
        },
        created() {
            bus.$on('input', (data) => {
                // console.log(data)
            })
        }
    }
</script>

<style scoped>

</style>
