<template>
  <div>
    <!--LISTA DE CLIENTES-->
    <div class="ma-12 elevation-1">
      <v-card>
        <v-list class="pa-12">
          <div class="text-center">
            <h1>Clientes</h1>
          </div>

          <v-list-item
          flat
          >
          <v-list-item-title>
            <b>NOME DE USUÁRIO</b> 
          </v-list-item-title>

          <v-list-item-title>
            <b>NOME</b> 
          </v-list-item-title>

          <v-list-item-title>
            <b>DATA DE NASCIMENTO</b> 
          </v-list-item-title>

          <v-list-item-title>
            <b>CPF</b> 
          </v-list-item-title>
          </v-list-item>


          <v-list-item v-for="cliente in clientes" :key="cliente.title">
            <v-list-item-content>
              <v-list-item-title v-text="cliente.usuario.username"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-text="cliente.nome"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-text="cliente.dataNascimento"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-text="cliente.cpf"></v-list-item-title>
            </v-list-item-content>

            <!--
            <v-list-item-action>
              <v-btn icon v-if="clientes.ativo">
                <v-icon color="green">mdi-check-bold</v-icon>
              </v-btn>

              <v-btn icon v-else>
                <v-icon color="grey">mdi-cancel</v-icon>
              </v-btn>
            </v-list-item-action>
            -->
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
    passwordRules: [
      v => !!v || "Senha é obrigatória",
      v => v.length <= 10 || "Senha deve ter no máximo 10 caracteres"
    ],
    usernameRules: [
      v => !!v || "Username é obrigatório",
      v => v.length <= 10 || "Username deve ter no máximo 10 caracteres"
    ],
    clientes: [
      {
        usuario: {
          username: "Maria da Silva"
        },
        nome: "Maria",
        dataNascimento: "12-03-1960",
        CPF: "12903107910"
      }
    ]
  }),
  methods: {
    buscarTodos() {
      HttpRequestUtil.buscarClientes().then(clientes => {
        this.clientes = clientes;
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