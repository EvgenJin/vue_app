<template>
  <v-dialog v-model="show" max-width="800px">
  <v-container>
    <v-card>
      <v-card-title class="justify-center">Модель</v-card-title>
      <v-card-subtitle>Добавить технику</v-card-subtitle>
      <v-row class="justify-center">
        <v-col sm="10">
          <v-select
            v-model="product.man_info"
            :items="list_manufacturers"
            item-text="name"
            label="Производитель"
            outlined
            return-object
          />
        </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col sm="10">
            <v-text-field
              v-model="product.name"
              label="Модель"
              outlined
            />
          </v-col>
      </v-row>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click.stop="submit">Добавить</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</v-dialog>
</template>

<script>
  import { bus } from '../main'
  export default {
      data:() =>({
        product: {
            name:"",
            man_info:{}
        }
      }),
      methods: {
          submit() {
              let model = {
                  name:this.product.name,
                  manufacturer_id:this.product.man_info.id
              };
              bus.$emit('input',model);
              console.log(model)
              // this.show=false
          }
      },
      props: {
        value: Boolean
      },
      computed: {
        list_manufacturers() {
            return this.$store.state.manufacturer.map(product => ({id:product.id,name:product.name}))
        },
        show: {
            get () {
              return this.value
            },
            set (value) {
              this.$emit('input', value)
            }
        }
      }
}
</script>
