<template>
  <div class="text-center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Compras realizadas:
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            label="Procurar compra por cliente"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="compras"
          item-key="valorTotal"
          :search="search"
          :single-expand="singleExpand"
          show-expand
          :expanded.sync="expanded"
        >
          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length">
              <v-list-item
                v-for="item in expanded"
                :key="item._id"
                class="text-start"
              >Produto(s): {{expanded[0].Produtos[0].descricao}}, {{expanded[0].Produtos[2].marca}}, R$: {{expanded[0].Produtos[1].valor}}</v-list-item>
            </td>
          </template>
        </v-data-table>

        <v-col>
          <v-list-item-title class="title">
            Valor Total Das Compras :
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
          value: "Produtos[0].descricao"
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
          value: "cliente.nome"
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