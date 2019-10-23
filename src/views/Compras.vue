<template>
  <div class="text-center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Compras realizadas:
          <div class="flex-grow-1"></div>
          <v-text-field v-model="search" label="Procurar produto" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="compras"
          item-key="compras.length"
          :search="search"
          :single-expand= "singleExpand"
          show-expand
        >
         
          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length">{{headers.produtos}}</td>
          </template>
        </v-data-table>
        <v-row justify="center">
          <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Lista de produtos</v-btn>
            </template>
            <v-card>
              <v-card-title>Lista de produtos</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px;">
                <v-list v-model="dialogm1" column>
                  <v-list-item-title>nome do produto 1</v-list-item-title>​
                  <v-list-item-title>nome do produto 2</v-list-item-title>​
                  <v-list-item-title>nome do produto 3</v-list-item-title>​
                  <v-list-item-title>nome do produto 4</v-list-item-title>​
                </v-list>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
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
      dialogm1: "",
      dialog: false,
      expanded: [],
      singleExpand: true,

      headers: [
        { text: "Detalhes da compra", align: "left" },

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