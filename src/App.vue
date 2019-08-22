<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">
        Smart&nbsp;
        <span class="font-weight-light">Market</span>
      </span>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

        

    </v-navigation-drawer>

    <v-content>
        <router-view/>
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
      items: [{
        title: 'Home',
        icon: 'mdi-home',
        route: '/'
      },
      {
        title: 'Clientes',
        icon: 'mdi-account',
        route: '/clientes'
      }
      ],
    }),
  }
</script>
<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>