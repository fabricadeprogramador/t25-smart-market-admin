<template>
  <v-card>
    <v-card>
      <v-card-title>Produtos com estoque baixo</v-card-title>
      <v-data-table
        :headers="headerProdEst"
        :items="listaProdEst"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card>

    <v-card class="mt-10" :elevation="15">
      <v-card-title>Produtos com vencimento próximo</v-card-title>
      <v-data-table
        :headers="headersProdVencto"
        :items="listaProdVencto"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-card>
</template>


<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data() {
    return {
      headerProdEst: [
        { text: "Produto", align: "left", sortable: true, value: "descricao" },
        { text: "Marca", align: "left", sortable: true, value: "marca" },
        {
          text: "Qtde. Disponível",
          align: "right",
          sortable: true,
          value: "qtdeDisponivel"
        }
      ],
      listaProdEst: [],

      headersProdVencto: [
        { text: "Produto", align: "left", sortable: true, value: "descricao" },
        { text: "Marca", align: "left", sortable: true, value: "marca" },
        {
          text: "Validade",
          align: "right",
          sortable: true,
          value: "validade"
        }
      ],
      listaProdVencto: [
        {
          descricao: "Arroz",
          marca: "Tio João",
          validade: "11/11/2019"
        },
        {
          descricao: "Feijão",
          marca: "Tio X",
          validade: "11/09/2019"
        }
      ]
    };
  },
  methods: {
    buscarTodos() {
      HttpRequestUtil.buscarProdutos().then(produtos => {
        for (let i = 0; i < produtos.length; i++) {
          if (parseFloat(produtos[i].qtdeDisponivel) < 50) {
            this.listaProdEst.push(produtos[i]);
          }
        }
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