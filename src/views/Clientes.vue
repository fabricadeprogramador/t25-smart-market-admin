<template>
  <div class="text-center">
    <v-col cols="12">
      <v-card>
        <v-card-title>Listagem de Clientes
          <div class="flex-grow-1"></div>
          <v-text-field v-model="search" label="Buscar Cliente" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="clientes" :search="search"></v-data-table>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "CPF",
          align: "left",
          sortable: false,
          value: "cpf"
        },

        {
          text: "Nome",
          value: "nome"
        },
        {
          text: "Telefone",
          value: "telefone"
        },
        {
          text: "E-mail",
          value: "email"
        }
      ],
      clientes: []
    };
  },
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