<template>
  <div class="text-center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Compras realizadas:
          <div class="flex-grow-1"></div>
          <v-text-field v-model="search" label="Procurar produto" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="compras" :search="search"></v-data-table>
        <v-col>
          <v-list-item-title class="title">
            VALOR TOTAL DAS COMPRAS :
            <v-list-item-title>R$: {{valortotalDasCompras}}</v-list-item-title>
          </v-list-item-title>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data() {
    return {
      valortotalDasCompras: 0,
      search: "",
      headers: [
        {
          text: "Produtos",
          align: "left",
          sortable: false,
          value: "produtos"
        },

        {
          text: "Valor (R$)",
          value: "valorTotal"
        },
        {
          text: "Data",
          value: "data"
        },
        {
          text: "Pagamento",
          value: "pagamento"
        },
        {
          text: "Cliente",
          value: "cliente"
        }
      ],
      compras: []
    };
  },

  methods: {
    buscarCompras() {
      HttpRequestUtil.buscarCompras().then(response => {
        this.compras = response;

        for (let i = 0; i < this.compras.length; i++) {
          this.valortotalDasCompras += parseFloat(this.compras[i].valorTotal);
        }
      });
    }
  },
  mounted() {
    this.buscarCompras();
  }
};
</script>

<style>
</style>