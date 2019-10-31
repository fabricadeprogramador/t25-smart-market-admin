<template>
  <v-card class="elevation-1 pa-12">
    <v-card>
      <v-card-title>Produtos com estoque menor que 50 unidades</v-card-title>
      <v-data-table :headers="headerProdEst" :items="listaProdEst" :items-per-page="5"></v-data-table>
    </v-card>

    <v-card class="mt-10">
      <v-card-title>Produtos vencendo em 7 dias</v-card-title>
      <v-data-table :headers="headersProdVencto" :items="listaProdVencto" :items-per-page="5"></v-data-table>
    </v-card>
  </v-card>
</template>


<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data() {
    return {
      headerProdEst: [
        { text: "Produto", align: "left", sortable: true, value: "nome" },
        { text: "Marca", align: "left", sortable: true, value: "marca" },
        {
          text: "Qtde. Disponível",
          align: "right",
          sortable: true,
          value: "qtdDisponivel"
        }
      ],
      listaProdEst: [],

      headersProdVencto: [
        { text: "Produto", align: "left", sortable: true, value: "nome" },
        { text: "Marca", align: "left", sortable: true, value: "marca" },
        { text: "Validade", align: "right", sortable: true, value: "validade" }
      ],
      listaProdVencto: []
    };
  },
  methods: {
    buscarTodos() {
      let dataVencimento = new Date();
      let limiteVen = new Date();
      
      HttpRequestUtil.buscarProdutos().then(produtos => {
        for (let i = 0; i < produtos.length; i++) {
          if (parseFloat(produtos[i].qtdDisponivel) < 50) {
            this.listaProdEst.push(produtos[i]);
          }

          dataVencimento = new Date(produtos[i].validade);
          limiteVen = new Date();
          limiteVen.setDate(limiteVen.getDate() + 7);

          if (dataVencimento <= limiteVen) {
            //produtos[i].vencimento = 
            this.listaProdVencto.push(produtos[i]);
             
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