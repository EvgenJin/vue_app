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
<!--            <img src="https://randomuser.me/api/portraits/women/81.jpg">-->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Username</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
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
      items: [
        { icon: 'add_shopping_cart', text: 'AddItem' , url : "AddItem"},
        { icon: 'edit', text: 'EditItem' , url: "EditItem"},

        { icon: 'history', text: 'baz' },
        { icon: 'featured_play_list', text: 'gaz' },
        { icon: 'watch_later', text: 'taz' },
      ]
    }),
    created () {
      this.$vuetify.theme.dark = false

    },
    mounted () {
        this.$store.dispatch('SETMANUFACTURER');
        this.$store.dispatch('set_models');
        this.$store.dispatch('set_stores')
    },
    methods : {
        test() {
            this.$router.push({name: 'HelloWorld'})
        },
    }
  }
</script>
