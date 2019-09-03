<template>
  <div>
    <div class="ma-12 elevation-1">
      <v-form v-model="valid" class="ma-12">
        <v-container class="pa-12">
          <div class="text-center">
          <h1>Cadastro de Clientes</h1>
          </div>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="10"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="10"
            label="Senha"
            required
            type="password"
          ></v-text-field>

          <div class="text-center">
            <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
          </div>
        </v-container>
      </v-form>
    </div>

    <!--LISTA DE CLIENTES-->
    <div class="ma-12 elevation-1">
      <v-card>
        <v-list class="pa-12">
          <div class="text-center">
            <h1>Clientes</h1>
          </div>
          <v-list-item v-for="cliente in clientes" :key="cliente.title">
            <v-list-item-content>
              <v-list-item-title v-text="cliente.username"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-text="cliente.tipo"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon v-if="cliente.ativo">
                <v-icon color="green">mdi-check-bold</v-icon>
              </v-btn>

              <v-btn icon v-else>
                <v-icon color="grey">mdi-cancel</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data: () => ({
    valid: false,
    username: "",
    password: "",
    email: "",
    passwordRules: [
      v => !!v || "Senha é obrigatória",
      v => v.length <= 10 || "Senha deve ter no máximo 10 caracteres"
    ],
    usernameRules: [
      v => !!v || "Username é obrigatório",
      v => v.length <= 10 || "Username deve ter no máximo 10 caracteres"
    ],
    clientes: []
  }),
  methods: {
    salvar() {
      let cliente = {};
      cliente.ativo = true;
      cliente.username = this.username;
      cliente.senha = this.password;
      cliente.tipo = "CLIENTE";

      HttpRequestUtil.salvarUsuario(cliente).then(response => {
        this.clientes.push(response);
      });
    },

    buscarTodos() {
      HttpRequestUtil.buscarUsuarios().then(usuarios => {
        this.clientes = usuarios;
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