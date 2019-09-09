<template>
  <div class="text-center">
    <v-btn color="info" class="my-5" @click="buscarCompras">Buscar compras realizadas</v-btn>
    <v-card>
      <v-list class="pa-12">
        <div class="text-center">
          <h1>Compras realizadas</h1>
        </div>
        <v-list-item v-for="compra in compras" :key="compra.title">
          <v-list-item-content>
            <v-list-item-title v-text="compra.produto"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="parseFloat(compra.valorTotal)"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="compra.data"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="compra.pagamento"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="compra.cliente"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="compra.cliente"></v-list-item-title>
          </v-list-item-content>
         
        </v-list-item>
         <v-list-item-content>
            <v-list-item-title> VALOR TOTAL DAS COMPRAS : {{valortotalDasCompras}} R$</v-list-item-title>
          </v-list-item-content>

      </v-list>
    </v-card>
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
    valortotalDasCompras: "",
  }),
  methods: {
    

    buscarCompras() {
      HttpRequestUtil.buscarCompras().then(response => {
        this.compras = response;

       for (let i = 0 ; i <= this.compras.length ; i++){
        this.valortotalDasCompras += parseFloat(this.compras[i].valorTotal);
      }
     });
     
    }
  }
};
</script>

<style>
</style>