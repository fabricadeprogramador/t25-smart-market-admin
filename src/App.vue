<template>
  <v-app id="keep" v-if="true">
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

  <v-app v-else>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="amber" flat>
              <v-toolbar-title>Login Market</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Username"
                  v-model="username"
                  prepend-icon="mdi-account"
                  type="text"
                  color="amber"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  color="amber"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="amber" @click="autenticar">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    username: "",
    password: "",
    logado: false,
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
      }
    ]
  }),
  methods: {
    autenticar() {
      let usuario = {};
      usuario.username = this.username;
      usuario.senha = this.password;
      usuario.tipo = "ADMIN";

      HttpRequestUtil.autenticar(usuario).then(usuarioAut => {
        if (JSON.stringify(usuarioAut[0]) != undefined) {
          if (
            usuarioAut[0].username == usuario.username &&
            usuarioAut[0].senha == usuario.senha &&
            usuarioAut[0].tipo == usuario.tipo
          ) {
            localStorage.setItem("logado", JSON.stringify(usuarioAut[0]));
            this.logado = true;
          }
        } else {
          alert("Usuário e/ou senha inválidos");
        }
      });
    }
  }
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