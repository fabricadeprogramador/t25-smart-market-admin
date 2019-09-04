<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- <v-col cols="12" md="6">
            <v-text-field v-model="nome" :rules="usernameRules" :counter="100" label="Nome" required></v-text-field>
          </v-col>-->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="valor"
              :rules="usernameRules"
              :counter="100"
              label="Valor"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="descricao"
              :rules="usernameRules"
              :counter="100"
              label="Descrição"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="qtdeDisponivel"
              :rules="usernameRules"
              :counter="100"
              label="Quantidade disponível"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="imagem"
              :rules="usernameRules"
              :counter="100"
              label="Adicione o link da imagem do produto"
              required
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="12" md="6">
            <v-select :items="items" label="marca" v-model="marca"></v-select>
          </v-col>-->
        </v-row>

        <div class="text-center">
          <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
        </div>
      </v-container>
    </v-form>

    <v-card class="ma-3">
      <v-list>
        <v-list-item v-for="produto in produtos" :key="produto.title">
          <v-list-item-content>
            <v-list-item-title v-text="produto.nome"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.valor"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.descricao"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="produto.qtdeDisponivel"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar>
            <v-img :src="produto.imagem"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="produto.marca"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="excluirProduto">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
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
      v => v.length <= 100 || "Username deve ter no máximo 20 caracteres"
    ],
    valor: "",
    descricao: "",
    qtdeDisponivel: "",
    imagem: "",
    marca: "z",

    departamento: {
      _id: "5cabd8ee1890cc0017f858d7"
    },
    // items: [
    //   "Açougue",
    //   "Adega e Bebidas",
    //   "Aves",
    //   "Bazar",
    //   "Frios e Laticínios",
    //   "Higiene e Limpeza",
    //   "Hortifruti",
    //   "Mercearia",
    //   "Padaria e Confeitaria",
    //   "Pescados",
    //   "Rotisseria"
    // ],
    produtos: []
  }),
  methods: {
    salvar() {
      let produto = {};
      produto.valor = parseFloat(this.valor);
      produto.descricao = this.descricao;
      produto.qtdeDisponivel = parseFloat(this.qtdeDisponivel);
      produto.imagem = this.imagem;
      produto.marca = this.marca;
      produto.departamento = this.departamento;

      HttpRequestUtil.salvarProduto(produto).then(produto => {
        this.produtos.push(produto);
      });

      alert(JSON.stringify(produto));
    },
    excluirProduto() {
      HttpRequestUtil.excluirProduto().then(produtos => {
        this.produtos = produtos;
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
