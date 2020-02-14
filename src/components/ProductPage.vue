<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <snackbar_alert/>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Страница продукта</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="show = false">Выход</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-item dense>
        <v-list-item-content>
          <v-row dense>
            <v-col cols="12" xs="12" sm="6">
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
            <v-col cols="12" xs="12" sm="6">
              <v-select
                v-model="product.model"
                :items="list_products"
                label="Модель"
                outlined
                :readonly=!switch_update
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="product.serial_num"
                class="styled-input"
                label="Серийный номер"
                outlined
                :readonly=!switch_update
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="product.inventory_num"
                label="Инвентарный номер"
                outlined
                :readonly=!switch_update
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="product.ip_addr"
                label="ip адрес"
                outlined
                :readonly=!switch_update
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="product.mac_addr"
                label="mac адрес"
                outlined
                :readonly=!switch_update
              />
            </v-col>
            <v-col cols="12" xs="12">
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
          <v-col xs="4">
            <v-switch
              v-model="switch_update"
              label="обновить"
            ></v-switch>
          </v-col>
          <v-col xs="4">

          </v-col>
          <v-col xs="4">
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
      <v-spacer></v-spacer>
    </v-card>
  </v-dialog>
</template>

<script>
    import {bus} from "../main";
    import snackbar_alert from "./common/snackbar_alert";
    export default {
        name: "ProductPage",
        data: () => ({
            show:false,
            showScheduleForm: false,
            product: {
                man_info:{}
            },
            new_storage:{},
            switch_update:false,
            switch_transfer:false
        }),
        components: {
            snackbar_alert
        },
        watch: {
          switch_update: function (val) {
            if (val) {
              this.switch_transfer = false
            }
          },
          switch_transfer: function (val) {
            if (val) {
              this.switch_update = false
            }
          }
        },
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
              let update_product = {
                id:this.product.id,
                model:this.product.model,
                manufacturer_id: this.product.man_info.id,
                serial_num:this.product.serial_num,
                inventory_num: this.product.inventory_num,
                ip_addr: this.product.ip_addr,
                store_id: this.product.storage.id,
              };
                fetch('http://localhost:3000/api/products/' + update_product.id, {
                  method: "PUT",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(update_product)
                }).then((res) => {
                  if (res.status == 200) {
                    bus.$emit('snackbar_alert',{str:'Продукт обновлен',type:'success'});
                    this.switch_update = false;
                  }
                  else {
                      bus.$emit('snackbar_alert',{str:'Ошибка',type:'success'});
                  }
                })
            },
            init(id) {
                fetch('http://localhost:3000/api/products/' + id).then(res => res.json())
                    .then(res => {
                        this.product.id = res.id;
                        this.product.man_info = res.man_info;
                        this.product.model = res.model;
                        this.product.serial_num = res.serial_num;
                        this.product.inventory_num = res.inventory_num;
                        this.product.ip_addr = res.ip_addr;
                        this.product.storage = res.store_info;
                    })
                    .then(res => this.show = true)
            }
        },
        created() {
            bus.$on('callProductPage', (data) => {
                this.init(data)
                // this.show = true;
            })
        },
        mounted() {
          // this.init();
        }
    }
</script>

<style scoped>

</style>
