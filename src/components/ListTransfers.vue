<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title>
            Трансферы
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
            :items="data"
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
                    { text: 'Дата', value: 'tr_date'},
                    { text: 'Откуда',align: 'left',value: 'store_from'},
                    { text: 'Куда', value: 'store_to' },
                    { text: 'Код', value: 'code'},
                    { text: 'Производитель', value: 'man_name'},
                    { text: 'Модель',value:'model_name'},
                    { text: 'Инвентарный',value:'inventory_num'},
                    { text: 'Серийный',value:'serial_num'},
                    { text: 'ip адресс', value: 'ip_addr'},
                    { text: 'Юзер',value:'user_name'},
                ],
                data:[]
            }
        },
        computed : {
        },
        methods: {
            onClickRow(row) {
                console.log(row)
            },
            nvl2(str1,str2) {
                if (!str1 || str1 == null) {
                  return str2
                }
                else return str1;
            },
            init() {
              fetch('http://localhost:3000/api/transfers/all').then(res => res.json())
                .then(res => {
                  res.forEach(el => {
                    let trans = {
                      id: el.id,
                      store_from : this.nvl2(el.store_from,''),
                      store_to: el.store_to,
                      code: el.code,
                      model_name: el.model_name,
                      inventory_num: el.inventory_num,
                      serial_num: el.serial_num,
                      user_name: el.user_name,
                      ip_addr: el.ip_addr,
                      tr_date: new Date(el.tr_date).toLocaleDateString(),
                      man_name: el.man_name
                    };
                    this.data.push(trans)
                  })
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
