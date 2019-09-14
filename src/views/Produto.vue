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
              label="Valor"
              required
              type="number"
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
              label="Quantidade disponível"
              required
              type="number"
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
              <v-list-item-title>Valor</v-list-item-title>​
            </v-col>

            <v-col md="3">
              <v-list-item-title>Produto</v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Marca</v-list-item-title>​
            </v-col>

            <v-col md="1" class="mb-8">
              <v-list-item-avatar>
                <v-list-item-title>Foto</v-list-item-title>
              </v-list-item-avatar>
            </v-col>

            <v-col md="2" class="mt-3">
              <v-list-item-title>Quantidade</v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title>Status</v-list-item-title>​
            </v-col>
            <v-col md="1" class="mb-8">
              <v-list-item-title>Editar</v-list-item-title>
            </v-col>
          </v-list-item>

          <v-list-item v-for="produto in produtos" :key="produto.title" class="text-start">
            <v-col md="2">
              <v-list-item-title>R$ {{produto.valor}}</v-list-item-title>​
            </v-col>

            <v-col md="3">
              <v-list-item-title v-text="produto.descricao"></v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="produto.marca"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-avatar>
                <v-img :src="produto.imagem"></v-img>
              </v-list-item-avatar>
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="produto.qtdeDisponivel"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-btn icon @click="alterarStatus(produto)">
                <v-icon>{{statusProduto}}</v-icon>
              </v-btn>
            </v-col>
            <v-col md="1">
              <v-btn icon @click="editarProdutos(produto)">
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
    produtoEditado: null,
    statusProduto: "mdi-cart",

    produtos: [],
    usernameRules: [v => !!v || "Campo preenchido é obrigatório"],
    valor: "",
    descricao: "",
    qtdeDisponivel: "",
    imagem: "",
    marca: "z",

    departamento: {
      _id: "5cabd8ee1890cc0017f858d7",
      imageM: "Imagem"
    }
  }),
  methods: {
    salvar() {
      if (this.produtoEditado == null) {
        let produto = {};
        produto.valor = parseFloat(this.valor);
        produto.descricao = this.descricao;
        produto.qtdeDisponivel = parseFloat(this.qtdeDisponivel);
        produto.imagem = this.imagem;
        produto.marca = this.marca;
        produto.departamento = this.departamento;

        HttpRequestUtil.salvarProduto(produto).then(produto => {
          this.produtos.push(produto);

          alert(JSON.stringify(produto));
        });
      } else {
        alert("Você está em uma edição de produto");
      }
    },

    editarProdutos(produto) {
      this.produtoEditado = produto;

      this.valor = produto.valor;
      this.descricao = produto.descricao;
      this.qtdeDisponivel = produto.qtdeDisponivel;
      this.imagem = produto.imagem;
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
    },

    editarProduto(produto) {
      this.produtoEditado = produto;

      this.valor = parseFloat(produto.valor);
      this.descricao = produto.descricao;
      this.qtdeDisponivel = parseFloat(produto.qtdeDisponivel);
      this.imagem = produto.imagem;
    },

    alterarStatus(produto) {
      if (this.statusProduto == "mdi-cart") {
        this.statusProduto = "mdi-cart-off";
      } else {
        this.statusProduto = "mdi-cart";
      }
    }
  },

  mounted() {
    this.buscarProdutos();
  }
};
</script>