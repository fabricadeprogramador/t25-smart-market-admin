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
              <v-text-field v-model="nome" :rules="usernameRules" :counter="100" label="Nome" required></v-text-field>
            </v-col>    

            <v-col cols="12" md="6">
              <v-text-field v-model="descricao" :rules="usernameRules" :counter="100" label="Descrição" required></v-text-field>
            </v-col>

         <v-col cols="12" md="6">
            <v-text-field v-model="marca" :rules="usernameRules" :counter="50" label="Marca" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="valor" :rules="usernameRules" :counter="10" label="Valor" required type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="validade" :rules="usernameRules" :counter="10" label="Validade" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="quantidade" :rules="usernameRules" label="Quantidade disponível" required type="number"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select v-model="setor" item-text="setor" label="setor" return-object></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="imagem" :rules="usernameRules" :counter="200" label="Link da imagem do produto" required></v-text-field>
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
         <v-col md="6">
            <v-text-field
          v-model="pesquisar"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
         </v-col>
          <v-list-item class="text-start title">
            <v-col md="1">
              <v-list-item-title>Nome</v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title>Marca</v-list-item-title>​
            </v-col>

            <v-col md="1" class="mb-8">
              <v-list-item-avatar>
                <v-list-item-title>Img</v-list-item-title>
              </v-list-item-avatar>
            </v-col>

            <v-col md="1">
              <v-list-item-title>Valor</v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title>Validade</v-list-item-title>​
            </v-col>

               <v-col md="1">
              <v-list-item-title>Descrição</v-list-item-title>​
            </v-col>


            <v-col md="1" >
              <v-list-item-title>Setor</v-list-item-title>​
            </v-col>

            <v-col md="1" >
              <v-list-item-title>Qtd</v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title>Status</v-list-item-title>​
            </v-col>
            <v-col md="1" class="mb-8">
              <v-list-item-title>Editar</v-list-item-title>
            </v-col>
          </v-list-item>

          <v-list-item v-for="produto in produtos" :key="produto.title" :search="pesquisar" class="text-start">

            <v-col md="1">
              <v-list-item-title v-text="produto.nome"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title v-text="produto.marca"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-avatar>
                <v-img :src="produto.imagem"></v-img>
              </v-list-item-avatar>
            </v-col>

            <v-col md="2">
              <v-list-item-title>R$ {{(produto.valor)}}</v-list-item-title>​
            </v-col>

             <v-col md="2">
              <v-list-item-title v-text="produto.validade"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title v-text="produto.descricao"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title v-text="produto.setor"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title v-text="produto.quantidade"></v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-btn icon @click="statusProduto(produto)">
                <v-icon v-if="produto.disponivel">{{disponivel}}</v-icon>
                <v-icon v-else>{{indisponivel}}</v-icon>                
              </v-btn>
            </v-col>
            <v-col md="1">
              <v-btn icon @click="editar(produto)">
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
      marca: "",
      valor: "",
      quantidade: "",
      imagem: "",
      descricao: "",
      setor: "",
      validade: "",
      pesquisar: "",
      
      disponivel: "mdi-cart",
      indisponivel: "mdi-cart-off",

      produtos: [],     

      produtoEditado: null,

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
 
            produto.nome = this.nome
            produto.marca = this.marca
            produto.valor = parseFloat(this.valor);
            produto.imagem = this.imagem;
            produto.setor = this.setor;
            produto.quantidade = parseFloat(this.quantidade);
            produto.status = this.disponivel
            produto.validade = this.validade

            HttpRequestUtil.adicionarProduto(produto).then(produto => {
              this.produtos.push(produto);
            });
            this.salvo = true;
          } else {

            this.produtoEditado.nome = this.nome
            this.produtoEditado.marca = this.marca
            this.produtoEditado.valor = parseFloat(this.valor);
            this.produtoEditado.quantidade = parseFloat(this.quantidade);
            this.produtoEditado.imagem = this.imagem;
            this.produtoEditado.setor = this.setor;
            this.produtoEditado.validade = this.validade

            HttpRequestUtil.editarProduto(this.produtoEditado).then(
              produtos => {}
            );
            this.editado = true;
            this.produtoEditado = null;
          }
          this.limparCampos();
        }
      },

      limparCampos() {
        this.nome
        this.valor = ""
        this.quantidade = ""
        this.imagem = ""
        this.marca = ""
        // this.setor = this.setor;
        this.validade = ""
      },

      buscarProdutos() {
        HttpRequestUtil.buscarProdutos().then(produtos => {
          this.produtos = produtos;
        });
      },

      validar() {
        if (
          this.nome == "" ||
          this.marca == "" ||
          this.valor == "" ||
          this.quantidade == "" ||
          this.imagem == "" ||
          this.descricao == "" ||
          this.validade == ""
          // this.setor == null
        ) {
          this.naoCadastrado = true;
          return false;
        }
        return true;
      },

      editar(produto) {
        this.produtoEditado = produto;

        this.nome = produto.nome
        this.valor = parseFloat(produto.valor);
        this.marca = produto.marca;
        this.descricao = produto.descricao;
        this.quantidade = parseFloat(produto.quantidade);
        this.imagem = produto.imagem;
        this.validade = produto.validade
      },
     
      statusProduto(produto) {
        
      produto.disponivel = !produto.disponivel

       HttpRequestUtil.editarProduto(produto).then(produtos => { 
         
        });
      }
    },

    mounted() {
      this.buscarProdutos();
    }
  };
</script>