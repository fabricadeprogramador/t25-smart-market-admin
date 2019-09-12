<template>
<v-card>
<v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
<v-data-table
    :headers="cabecalho"
    :items="produtos"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</v-card>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

  export default {
   data () {
      return {
        cabecalho: [
          {text: 'Produtos', value: 'name'},
          { text: 'Valor(R$)', value: 'valorTotal' },
          { text: 'Data', value: 'data' },
          { text: 'Pagamento', value: 'pagamento' },
          { text: 'Cliente', value: 'cliente' },
        ],
        produtos: []
      }
    },
  methods: {
    buscarCompras(){
         HttpRequestUtil.buscarCompras().then(produtos => {
        this.produtos = produtos;
      });
    }
  },
  mounted() {
    this.buscarCompras()
  },
  }
</script>
<style>
</style>