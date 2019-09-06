<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- <v-col cols="12" md="6">
            <v-text-field v-model="nome" :rules="usernameRules" :counter="100" label="Nome" required></v-text-field>
          </v-col>-->
          <v-col cols="12" md="6">
            <v-text-field v-model="valor" :rules="usernameRules" :counter="100" label="Valor" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="descricao" :rules="usernameRules" :counter="100" label="Descrição" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="qtdeDisponivel" :rules="usernameRules" :counter="100" label="Quantidade disponível"
              required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="imagem" :rules="usernameRules" :counter="100"
              label="Adicione o link da imagem do produto" required></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
        </div>
      </v-container>
    </v-form>

    <v-col cols="12">
      <v-card>
        <v-list>
          <v-list-item class="text-start title">
            <v-col md="2">
              <v-list-item-title>Valor</v-list-item-title>
              ​
            </v-col>

            <v-col md="3">
              <v-list-item-title>Produto</v-list-item-title>
              ​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Marca</v-list-item-title>
              ​
            </v-col>

            <v-col md="1" class="mb-5">
              <v-list-item-avatar>
                <v-list-item-title>Foto</v-list-item-title>
              </v-list-item-avatar>
            </v-col>

            <v-col md="2">
              <v-list-item-title>Quantidade</v-list-item-title>
              ​
            </v-col>

            <v-col md="1">

            </v-col>
            <v-col md="1">


            </v-col>

          </v-list-item>



          <v-list-item v-for="produto in produtos" :key="produto.title" class="text-start">
            <v-col md="2">
              <v-list-item-title>R$ {{produto.valor}}</v-list-item-title>
              ​
            </v-col>

            <v-col md="3">
              <v-list-item-title v-text="produto.descricao"></v-list-item-title>
              ​
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="produto.marca"></v-list-item-title>
              ​
            </v-col>

            <v-col md="1">
              <v-list-item-avatar>
                <v-img :src="produto.imagem"></v-img>
              </v-list-item-avatar>
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="produto.qtdeDisponivel"></v-list-item-title>
              ​
            </v-col>

            <v-col md="1">
              <v-btn icon @click="excluirProduto">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-col md="1">

              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
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
      produtos: [],
      cabecalho: [{
          qtdeDisponiveL: "Qtd Disponível"
        },
        {
          imageM: "Imagem"
        }
      ]
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