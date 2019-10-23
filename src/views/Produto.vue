<template>
  <div>
    <div>
      <v-alert v-model="salvo" border="left" close-text="Close Alert" class="text-center" color="info" dark dismissible
        transition="scale-transition">PRODUTO CADASTRADO COM SUCESSO!</v-alert>
    </div>
    <div>
      <v-alert v-model="editado" border="left" close-text="Close Alert" class="text-center" color="info" dark
        dismissible transition="scale-transition">PRODUTO EDITADO COM SUCESSO!</v-alert>
    </div>
    <div>
      <v-alert v-model="naoCadastrado" border="left" close-text="Close Alert" class="text-center" color="red" dark
        dismissible transition="scale-transition">NÃO FOI POSSÍVEL CADASTRAR O PRODUTO, PREENCHA OS CAMPOS VAZIOS!
      </v-alert>  
    </div>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="preco" :rules="usernameRules" label="preco" required type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="descricao" :rules="usernameRules" :counter="100" label="Descrição" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="qtdDisponivel" :rules="usernameRules" label="Quantidade disponível" required
              type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="imagem" :rules="usernameRules" :counter="100"
              label="Adicione o link da imagem do produto" required></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="setor" item-text="nome" label="setor"
              return-object></v-select>
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
              <v-list-item-title>preco</v-list-item-title>​
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
              <v-list-item-title>R$ {{(produto.preco).toFixed(2)}}</v-list-item-title>​
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
              <v-list-item-title v-text="produto.qtdDisponivel"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-btn icon @click="statusProduto(produto)">
                <v-icon v-if="produto.ativo">{{ativado}}</v-icon>
                <v-icon v-else>{{desativado}}</v-icon>                
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
      nome: "",
      ativado: "mdi-cart",
      desativado: "mdi-cart-off",
      preco: "",
      descricao: "",
      qtdDisponivel: "",
      imagem: "",
      marca: "",
      setor: "",

      produtos: [],     

      produtoEditado: null,

      ativo: true,
      salvo: false,
      editado: false,
      naoCadastrado: false,

      usernameRules: [v => !!v || "Campo preenchido é obrigatório"]

    }),
    methods: {
      salvar() {
        let ehvalido = this.validar();

        if (ehvalido) {
          if (this.produtoEditado == null) {
            let produto = {};

            produto.preco = parseFloat(this.preco);
            produto.status = this.ativo
            produto.descricao = this.descricao;
            produto.qtdDisponivel = parseFloat(this.qtdDisponivel);
            produto.imagem = this.imagem;
            produto.marca = ""
            produto.setor = this.setor;

            HttpRequestUtil.salvarProduto(produto).then(produto => {
              this.produtos.push(produto);
            });
            this.salvo = true;
          } else {

            this.produtoEditado.preco = parseFloat(this.preco);
            this.produtoEditado.descricao = this.descricao;
            this.produtoEditado.qtdDisponivel = parseFloat(this.qtdDisponivel);
            this.produtoEditado.imagem = this.imagem;
            this.produtoEditado.marca = "Teste"
            this.produtoEditado.setor = this.setor;

            HttpRequestUtil.editarProduto(this.produtoEditado).then(
              produtos => {}
            );
            this.editado = true;
            this.produtoEditado = null;
          }
          this.limparCampos();
        }
      },

      editarProdutos(produto) {
        this.produtoEditado = produto;

        this.preco = produto.preco;
        this.descricao = produto.descricao;
        this.qtdDisponivel = produto.qtdDisponivel;
        this.imagem = produto.imagem;
      },
     
      limparCampos() {
        this.preco = ""
        this.descricao = ""
        this.qtdDisponivel = ""
        this.imagem = ""
        this.marca = ""
        this.setor = this.setor;
      },

      buscarProdutos() {
        HttpRequestUtil.buscarProdutos().then(produtos => {
          this.produtos = produtos;
        });
      },

      validar() {
        if (
          this.preco == "" ||
          this.descricao == "" ||
          this.qtdDisponivel == "" ||
          this.imagem == "" ||
          this.setor == null
        ) {
          this.naoCadastrado = true;
          return false;
        }
        return true;
      },

      editarProduto(produto) {
        this.produtoEditado = produto;

        this.preco = parseFloat(produto.preco);
        this.descricao = produto.descricao;
        this.qtdDisponivel = parseFloat(produto.qtdDisponivel);
        this.imagem = produto.imagem;
      },
     
      statusProduto(produto) {
        
      produto.ativo = !produto.ativo

       HttpRequestUtil.editarProduto(produto).then(produtos => { 
         
        });
      }
    },

    mounted() {
      this.buscarProdutos();
    }
  };
</script>