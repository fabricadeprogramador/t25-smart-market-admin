<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="10"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="Senha"
              required
              type="password"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-select :items="items" label="Tipo" v-model="tipo"></v-select>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
        </div>
      </v-container>
    </v-form>

    <v-card class="ma-3">
      <v-list>
        <v-list-item v-for="usuario in usuarios" :key="usuario.title">
          <v-list-item-content>
            <v-list-item-title v-text="usuario.username"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="usuario.tipo"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon >
              <v-icon v-if="usuario.ativo" color="green">{{ativado}}</v-icon>
              <v-icon v-else color="grey">{{desativado}}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data: () => ({
    valid: false,
    ativado: mdi-check-bold,
    desativado: mdi-cancel,
    id: 0,
    ativo: true,
    username: "",
    password: "",
    passwordRules: [
      v => !!v || "Senha é obrigatória",
      v => v.length <= 10 || "Senha deve ter no máximo 10 caracteres"
    ],
    usernameRules: [
      v => !!v || "Username é obrigatório",
      v => v.length <= 10 || "Username deve ter no máximo 10 caracteres"
    ],
    tipo: "",
    items: ["ADMIN", "CLIENTE"],
    usuarios: []
  }),
  methods: {
    salvar() {
      let usuario = {};
      usuario.id = this.id;
      usuario.ativo = this.ativo;
      usuario.username = this.username;
      usuario.senha = this.password;
      usuario.tipo = this.tipo;

      HttpRequestUtil.salvarUsuario(usuario).then(response => {
        this.usuarios.push(response);
      });
    },

    buscarTodos() {
      HttpRequestUtil.buscarUsuarios().then(usuarios => {
        this.usuarios = usuarios;
      });
    }
  },

  mounted() {
    this.buscarTodos();
  }
};
</script>

<style>
</style>