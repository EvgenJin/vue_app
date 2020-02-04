<template>
  <v-app id="inspire">

    <v-navigation-drawer
     v-model="drawer"
     app dark clipped>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
            <v-btn x-small dark color="secondary" @click="logout()">logout</v-btn>
          </v-list-item-content>
        </v-list-item>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          @click="$router.push({ name: item.url, params: { id : 1 } })"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              {{ item.text }}
          </v-list-item-content>
        </v-list-item>
<!--         <v-subheader class="mt-4 grey&#45;&#45;text text&#45;&#45;darken-1">SUBSCRIPTIONS</v-subheader>-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app clipped-left
      color="blue lighten-1" dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Складской учет v.1.0b</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
          <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'add_shopping_cart', text: 'Добавить товар' , url : "AddItem"},
        { icon: 'devices', text: 'Товары',url: "ListProducts" },
        { icon: 'store', text: 'Склады', url: "ListStores" },
        { icon: 'compare_arrows', text: 'Трансферы',url:"ListTransfers" },
      ]
    }),
    computed: {
      user(){
          return this.$store.state.login;
      }
    },
    created () {
      this.$vuetify.theme.dark = false;
    },
    mounted () {
        //загрузить в Vuex производителей, модели, склады, продукты, пользователя
        this.$store.dispatch('set_manufacturer');
        this.$store.dispatch('set_models');
        this.$store.dispatch('set_stores');
        this.$store.dispatch('set_products');
        this.$store.dispatch('set_login');
    },
    methods : {
      logout() {
          localStorage.removeItem('jwt');
          localStorage.removeItem('login');
          this.$store.commit('set_login', null);
          this.$router.push({name: 'Login'})
      }
    }
  }
</script>
<style>
  #inspire {
    background: url( '../assets/back.jpg') no-repeat;
    background-size: cover;
  }
</style>
