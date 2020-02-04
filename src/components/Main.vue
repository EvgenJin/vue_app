<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      clipped>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
            <v-btn x-small dark color="secondary"
              @click="logout()"
            >logout
            </v-btn>
<!--            <v-btn text icon color="pink">-->
<!--              <v-icon>mdi-heart</v-icon>-->
<!--            </v-btn>-->
<!--            <v-list-item-subtitle>Logged In</v-list-item-subtitle>-->
          </v-list-item-content>
        </v-list-item>
      </template>
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
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader> -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="blue lighten-1"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">WarehouseApp</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <!-- <v-container class="fill-height"> -->
        <!-- <v-row justify="center" align="center"> -->
          <router-view/>
        <!-- </v-row> -->
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      login:{},
      items: [
        { icon: 'add_shopping_cart', text: 'AddItem' , url : "AddItem"},
        { icon: 'find_in_page', text: 'EditItem' , url: "EditItem"},
        { icon: 'devices', text: 'ListProducts',url: "ListProducts" },
        { icon: 'store', text: 'ListStores', url: "ListStores" },
        { icon: 'compare_arrows', text: 'ListTransfers',url:"ListTransfers" },
      ]
    }),
    computed: {
      user(){
          return this.$store.state.login;
      }
    },
    created () {
      this.$vuetify.theme.dark = false;
      this.init();
    },
    mounted () {
        this.$store.dispatch('set_manufacturer');
        this.$store.dispatch('set_models');
        this.$store.dispatch('set_stores');
        this.$store.dispatch('set_products');
        this.$store.dispatch('set_login');
        this.init()
    },
    methods : {
      init() {
      },
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
