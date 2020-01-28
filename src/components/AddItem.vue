<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="8">
        <v-card  shaped>
          <v-card-title>ТМЦ</v-card-title>
          <v-card-subtitle>Добавить ценность</v-card-subtitle>
          <v-list-item dense>
            <v-list-item-content>
<!--              <v-row>-->
                <v-col sm="6">
<!--                  <v-text-field v-model="product.manufacturer" label="Производитель" outlined></v-text-field>-->
                  <v-select
                    :items="manufacturers"
                    label="Standard"
                    v-model="product.manufacturer"
                  ></v-select>
                </v-col>
                <v-col sm="6">
                  <v-text-field v-model="product.model" label="Модель" outlined></v-text-field>
                </v-col>
<!--              </v-row>-->
<!--              <v-row>-->
                <v-col sm="6">
                  <v-text-field v-model="product.serial_num" label="Серийный номер" outlined></v-text-field>
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
                  <v-text-field v-model="product.storage" label="склад" outlined></v-text-field>
                </v-col>
<!--              </v-row>-->
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row
              class="justify-center"
            >
              <v-btn
                raised
                color="primary"
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
                manufacturer: null,
                model: null,
                serial_num: null,
                inventory_num: null,
                ip_addr:null,
                mac_addr:null,
                fiz_addr:null,
                storage:null,
            },
        }),
        name: "Product",
        computed : {
            manufacturers() {
                return this.$store.state.manufacturer.map(product => product.name);
            },
            products() {
                return this.$store.state.product
            }
        },
        mounted() {
            this.drawer = false;
            console.log(this.$store.state.manufacturer)
            // this.getProductInfo();
            // this.getProductStorages();
        }
        , methods: {
            addProduct(product) {
                console.log(product)
            }
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
