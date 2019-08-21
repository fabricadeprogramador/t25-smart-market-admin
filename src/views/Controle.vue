<template>
<v-card>
  <v-card>
    <v-card-title>Produtos com estoque baixo</v-card-title>
    <v-data-table :headers="headers" :items="produtosestoque" :items-per-page="5" class="elevation-1"></v-data-table>
  </v-card>

  <v-card class="mt-10" :elevation=15>
    <v-card-title>Produtos com vencimento próximo</v-card-title>
    <v-data-table :headers="headers" :items="produtosvencimento" :items-per-page="5" class="elevation-1"></v-data-table>
  </v-card>  
</v-card>
</template>


<script>
export default {
  data() {
    return {
      headers: [
        { text: "Produto", align: "left", sortable: true, value: "name"},
        { text: "Quantidade", value: "quantidade" },
        { text: "Validade",align: "right", value: "validade" }
      ],
      produtosestoque: [
        {
          name: "Guaraná Antártica Estoque",
          quantidade: 159,
          validade: '01/09/2019'
        },
        {
          name: "Ice cream sandwich",
          quantidade: 237,
          validade: '25/09/2019'
        },
        {
          name: "Eclair",
          quantidade: 262,
          validade: '12/05/2020'
        },
        {
          name: "Cupcake",
          quantidade: 305,
          validade: '25/04/2000'
        },
        {
          name: "Gingerbread",
          quantidade: 356,
          validade: '01/09/2018'
        },
        {
          name: "Jelly bean",
          quantidade: 375,
          validade: '12/07/2028'
        },
        {
          name: "Lollipop",
          quantidade: 392,
          validade: '01/09/2019'
        },
        {
          name: "Honeycomb",
          quantidade: 408,
          validade: '30/03/2019'
        },
        {
          name: "Donut",
          quantidade: 452,
          validade: '29/11/2037'
        },
        {
          name: "KitKat",
          quantidade: 518,
          validade: '05/02/2020'
        }
      ],
      produtosvencimento: [
        {
          name: "Guaraná Antártica Vencto",
          quantidade: 159,
          validade: '01/09/2019'
        },
        {
          name: "Ice cream sandwich",
          quantidade: 237,
          validade: '25/09/2019'
        },
        {
          name: "Eclair",
          quantidade: 262,
          validade: '12/05/2020'
        },
        {
          name: "Cupcake",
          quantidade: 305,
          validade: '25/04/2000'
        },
        {
          name: "Gingerbread",
          quantidade: 356,
          validade: '01/09/2018'
        },
        {
          name: "Jelly bean",
          quantidade: 375,
          validade: '12/07/2028'
        },
        {
          name: "Lollipop",
          quantidade: 392,
          validade: '01/09/2019'
        },
        {
          name: "Honeycomb",
          quantidade: 408,
          validade: '30/03/2019'
        },
        {
          name: "Donut",
          quantidade: 452,
          validade: '29/11/2037'
        },
        {
          name: "KitKat",
          quantidade: 518,
          validade: '05/02/2020'
        }
      ]
    };
  }
};
</script>

<style>
</style>