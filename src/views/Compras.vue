<template>
  <div class="text-center">
    <v-btn color="info" class="my-5" @click="buscarCompras">Buscar compras realizadas</v-btn>
    <v-col cols="12">
      <v-card>
        <v-list class="pa-12">
          <div class="text-center">
            <h1>Compras realizadas</h1>
          </div>

          <v-list-item class="text-center title">
            <v-col md="2">
              <v-list-item-title>Produto</v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Valor</v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Data</v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Pagamento</v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Cliente</v-list-item-title>​
            </v-col>
          </v-list-item>

          <v-list-item v-for="compra in compras  " :key="compra.title" class="text-center">
            <v-col md="2">
              <v-list-item-title v-text="compra.produto"></v-list-item-title>
            </v-col>

            <v-col md="2">
              <v-list-item-title>R$ {{compra.valorTotal}}</v-list-item-title>
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="compra.data"></v-list-item-title>
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="compra.pagamento"></v-list-item-title>
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="compra.cliente"></v-list-item-title>
            </v-col>
          </v-list-item>
          <v-col>
            <v-list-item-title class="title">
              VALOR TOTAL DAS COMPRAS :
              <v-list-item-title>{{valortotalDasCompras}} R$</v-list-item-title>
            </v-list-item-title>
          </v-col>
        </v-list>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data: () => ({
    produtos: "",
    valorTotal: "",
    data: "",
    pagamento: "",
    cliente: "",
    compras: [],
    valortotalDasCompras: 0
  }),
  methods: {
    buscarCompras() {
      HttpRequestUtil.buscarCompras().then(response => {
        this.compras = response;

        for (let i = 0; i < this.compras.length; i++) {
          this.valortotalDasCompras += parseFloat(this.compras[i].valorTotal);
        }
      });
    }
  }
};
</script>

<style>
</style>