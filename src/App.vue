<template>
  <v-app id="keep">
    <router-link to='/login'>Login</router-link>
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
      
      <router-view />
    </v-content>

    <v-footer color="amber" padless>
      <div class="flex-grow-1"></div>
      <div>Fábrica de Programador - High Tech Cursos&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      {
        title: "Home",
        icon: "mdi-home",
        route: "/home"
      },
      {
        title: "Clientes",
        icon: "mdi-account",
        route: "/clientes"
      },

      {
        title: "Produtos",
        icon: "mdi-basket",
        route: "/produtos"
      },
      {
        title: "Controle",
        icon: "mdi-apps-box",
        route: "/controle"
      },
      {
        title: "Usuarios",
        icon: "mdi-account-multiple",
        route: "/usuarios"
      },
      {
        title: "Contato",
        icon: "mdi-comment-account",
        route: "/contato"
      },

      {
        title: "Compras",
        icon: "mdi-cart",
        route: "/compras"
      },
      {
        title: "Setores",
        icon: "mdi-apps-box",
        route: "/setores"
      },
      {
        title: "Sair",
        icon: "mdi-exit-to-app",
        route: "/"
      },
    ]
  })
};
</script>
<style>
#keep .v-navigation-drawer__border {
  display: none;
}

a {
  text-align: center;
  font-size: 20pt;
  font-family: sans-serif;
  font-weight: bold;
  color: #2c3e50;
}
</style>