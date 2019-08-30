<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="nome" :rules="usernameRules" :counter="10" label="Nome" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="preco"
              :rules="usernameRules"
              :counter="10"
              label="Preço"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="qtdMin"
              :rules="usernameRules"
              :counter="10"
              label="Quantidade Mínima"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="qtdMax"
              :rules="usernameRules"
              :counter="10"
              label="Quantidade Máxima"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="imagem"
              :rules="usernameRules"
              :counter="10"
              label="Adicione o link da imagem do produto"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-select :items="items" label="Setor" v-model="setor"></v-select>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
        </div>
      </v-container>
    </v-form>

    <v-card class="ma-3">
      <v-list>
        <v-list-item v-for="produto in produtos" :key="produto.title" @click>
          <v-list-item-content>
            <v-list-item-title v-text="produto.nome"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.preco"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.qtdMin"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.qtdMax"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.imagem"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.setor"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data: () => ({
    valid: false,
    nome: "",

    usernameRules: [
      v => !!v || "Campo preenchido é obrigatório",
      v => v.length <= 20 || "Username deve ter no máximo 20 caracteres"
    ],
    preco: "",
    qtdMin: "",
    qtdMax: "",
    imagem: "",
    setor: "",
    items: [
      "Açougue",
      "Adega e Bebidas",
      "Aves",
      "Bazar",
      "Frios e Laticínios",
      "Higiene e Limpeza",
      "Hortifruti",
      "Mercearia",
      "Padaria e Confeitaria",
      "Pescados",
      "Rotisseria"
    ],
    produtos: []
  }),
  methods: {
    salvar() {
      let produto = {};
      produto.nome = this.nome;
      produto.preco = this.preco;
      produto.qtdMin = this.qtdMin;
      produto.qtdMax = this.qtdMax;
      produto.imagem = this.imagem;
      produto.setor = this.setor;

      HttpRequestUtil.salvarProduto(produto).then(response => {
        this.produtos.push(response);
      });
    },

    buscarProdutos() {
      HttpRequestUtil.buscarProdutos().then(produtos => {
        this.produtos = produtos;
      });
    }
  },

  mounted() {
    this.buscarProdutos();
  }
};
</script>

<style>
</style>