<!--диалог добавления модели-->
<template>
  <v-dialog v-model="show" max-width="800px">
  <snackbar_alert/>
  <v-container>
    <v-form v-model="valid">
    <v-card shaped>
      <v-row dense class="justify-center">
        <v-card-subtitle>Добавить модель</v-card-subtitle>
        <v-col sm="10">
          <v-autocomplete
            v-model="product.type_info"
            :items="list_producttypes"
            outlined
            dense
            item-text="name"
            label="Тип устройства"
            return-object
            :rules="[v => !!v || 'должно быть заполнено']"
            required
          />
        </v-col>
        <v-col sm="10">
          <v-autocomplete
            v-model="product.man_info"
            :items="list_manufacturers"
            outlined
            dense
            item-text="name"
            label="Производитель"
            return-object
            :rules="[v => !!v || 'должно быть заполнено']"
            required
          />
        </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col sm="10">
            <v-text-field
              v-model="product.name"
              label="Модель"
              outlined
              dense
              :rules="[v => !!v || 'должно быть заполнено']"
              required
            />
          </v-col>
      </v-row>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click.stop="show=false">Отмена</v-btn>
        <v-btn :disabled="!valid"  color="primary" @click.stop="submit">Добавить</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</v-container>
</v-dialog>
</template>

<script>
import snackbar_alert from "./common/snackbar_alert";
import {bus} from "../main";
  export default {
      data:() =>({
        valid:true,
        show:false,
        product: {
            name:"",
            man_info:{},
            type_info:{}
        }
      }),
      methods: {
          submit() {
              let model = {
                  name:this.product.name,
                  manufacturer_id:this.product.man_info.id,
                  type_id:this.product.type_info.id
              };
              fetch('http://localhost:3000/api/models', {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(model)
              }).then((res) => {
                  if (res.status == 200) {
                      bus.$emit('snackbar_alert',{str:'Продукт добавлен',type:'success'});
                      this.$store.dispatch('set_models');
                      this.product = {man_info: {}, type_info:{}}
                  }
                  else {
                      bus.$emit('snackbar_alert',{str:'Ошибка добавления Продукта',type:'error'});
                  }
              })

          }
      },
      computed: {
        list_manufacturers() {
            return this.$store.state.manufacturer.map(product => ({id:product.id,name:product.name}))
        },
        list_producttypes() {
          return this.$store.state.producttypes
        }
      }
      ,components: {
          snackbar_alert
      },
      created() {
          bus.$on('callModelAdd', (data) => {
              this.show = true;
          })
      }
}
</script>
