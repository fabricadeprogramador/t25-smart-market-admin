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
      <div class="clientes">
        <router-link to="/clientes">Clientes</router-link>
      </div>
    </v-navigation-drawer>

    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
<style>
#keep .v-navigation-drawer__border {
  display: none;
}
.clientes {
  width: 100%;
  text-align: center;
  padding: 15px;
}
</style>