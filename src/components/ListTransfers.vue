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
                    { text: 'Дата', value: 'date'},
                    { text: 'Откуда',align: 'left',value: 'store_f'},
                    { text: 'Куда', value: 'store_t' },
                    { text: 'Код', value: 'code'},
                    { text: 'Модель',value:'model'},
                    { text: 'Инвентарный',value:'inventory_num'},
                    { text: 'Серийный',value:'serial_num'},
                    { text: 'ip адресс', value: 'ip_addr'},
                    { text: 'Юзер',value:'user'},
                ],
                data:[]
            }
        },
        computed : {
        },
        methods: {
            onClickRow(row) {
                console.log(row.id)
            },
            nvl2(str1,str2,str3) {
                if (!str1 || str1 == null) {
                  return str3
                }
                else return str1;
            },
            init() {
                fetch('http://localhost:3000/api/transfers/all').then(res => res.json())
                    .then(res => {
                        res.forEach(el => {
                            let tr_date = new Date(el.tr_date).toLocaleDateString();
                            let trans = {
                              store_f : this.nvl2(el.store_f,'1','2').name,
                              store_t: el.store_t.name,
                              code: el.code,
                              model: el.product_info.model,
                              inventory_num: el.product_info.inventory_num,
                              serial_num: el.product_info.serial_num,
                              user: el.user,
                              date: tr_date,
                              ip_addr: el.product_info.ip_addr
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
