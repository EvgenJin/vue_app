<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="8">
        <v-card shaped>
          <v-card-title class="justify-center">ТМЦ</v-card-title>
          <v-card-subtitle>Добавить технику</v-card-subtitle>
          <v-list-item dense>
            <v-list-item-content>
            <v-row>
            <v-col sm="6">
              <v-select
                :items="list_manufacturers"
                label="Производитель"
                outlined
                return-object
                v-model="product.manufacturer"
                item-text="name"
              ></v-select>
            </v-col>
            <v-col sm="6">
              <v-select
                :items="list_products"
                label="Модель"
                outlined
                v-model="product.model"
              ></v-select>
            </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-text-field v-model="product.serial_num" class="styled-input" label="Серийный номер" outlined></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field v-model="product.inventory_num" label="Инвентарный номер" outlined></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field v-model="product.ip_addr" label="ip адрес" outlined></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field v-model="product.mac_addr" label="mac адрес" outlined></v-text-field>
              </v-col>
              <v-col sm="12">
                <v-select
                  :items="list_storages"
                  label="Склад"
                  outlined
                  v-model="product.storage"
                  return-object
                  item-text="address"
                ></v-select>
              </v-col>
            </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-alert :value="alert_notice.on" :type="alert_notice.type">
            {{alert_notice.message}}
          </v-alert>
          <v-card-actions>
            <v-row class="justify-center">
              <v-btn
                raised
                color="primary"
                @click="handleSubmit()"
              >Добавить</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        data: () => ({
            product: {
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
        name: "Product",
        computed : {
          list_manufacturers() {
            return this.$store.state.manufacturer.map(product => ({id:product.id,name:product.name}))
          },
          list_products() {
            return this.$store.state.products.filter(res => res.manufacturer === this.product.manufacturer.name).map(product => product.name);
          },
          list_storages() {
            return this.$store.state.storages.map(res => ({id:res.id, name:res.name, address:res.address}))
          }
        },
        mounted() {
            this.drawer = false;
            // this.getProductInfo();
            // this.getProductStorages();
        }
        , methods: {
            handleSubmit() {
              let product_object = {
                model: this.product.model,
                manufacturer_id: this.product.manufacturer.id,
                serial_num: this.product.serial_num,
                inventory_num: this.inventory_num,
                ip_addr: this.product.ip_addr,
                store_id: this.product.storage.id
              };
              this.alarma(product_object,'info');
            },
            alarma(str,type) {
              this.alert_notice.on = true;
              this.alert_notice.type = type;
              this.alert_notice.message = str;
              setTimeout(() => {
                this.alert_notice.on = false;
              }, 2000)
            },
            // getProductInfo() {
            //     this.$route.params.id = 10;
            //     if (typeof (this.$route.params.id) !== 'undefined') {
            //         let id = this.$route.params.id;
            //         fetch('http://localhost:8080/JEE7_REST/api/products/' + id, {method: "GET"}).then(res => res.json())
            //             .then(res => {
            //                 let doubles = res.img_array.map(function (num) {
            //                     let obj = {id: "", src: ""};
            //                     obj.src = num;
            //                     return obj
            //                 });
            //                 res.img_array = doubles;
            //                 this.product = res;
            //             })
            //     }
            // },
            // getProductStorages() {
            //     this.$route.params.id = 10;
            //     if (typeof (this.$route.params.id) !== 'undefined') {
            //         let id = this.$route.params.id;
            //         fetch('http://localhost:8080/JEE7_REST/api/products/' + id + '/storages', {method: "GET"}).then(res => res.json())
            //             .then(res => {
            //                 res.forEach((el) => {
            //                     this.storages.push(el);
            //                 })
            //             })
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>
