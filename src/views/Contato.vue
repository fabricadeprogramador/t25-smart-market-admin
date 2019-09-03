<template>
  <div  class="mx-5 my-10" >
    <v-dialog
 
      v-model="dialog"
      width="600"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="lido"
          color="red lighten-2"
          dark
          width="200"
          v-on="on"
        >
          Cliente X
        </v-btn>
      </template>

     
      <v-card>
        <v-card-title
        
          class="headline grey lighten-2"
          primary-title
        >
          Assunto: Sugestão sobre itens no painel.
        </v-card-title>

        <v-card-text>
          Poderia add a opção de detalhes no carrinho de produtos.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data () {
      return {
        dialog: false,
        lido: true,
      }
    },
  }
</script>

<style>



</style>