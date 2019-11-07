<template>
  <div>
    <div>
      <v-alert
        v-model="salvo"
        border="left"
        close-text="Close Alert"
        class="text-center"
        color="info"
        dark
        dismissible
        transition="scale-transition"
      >PRODUTO CADASTRADO COM SUCESSO!</v-alert>
    </div>
    <div>
      <v-alert
        v-model="editado"
        border="left"
        close-text="Close Alert"
        class="text-center"
        color="info"
        dark
        dismissible
        transition="scale-transition"
      >PRODUTO EDITADO COM SUCESSO!</v-alert>
    </div>
    <div>
      <v-alert
        v-model="naoCadastrado"
        border="left"
        close-text="Close Alert"
        class="text-center"
        color="red"
        dark
        dismissible
        transition="scale-transition"
      >NÃO FOI POSSÍVEL CADASTRAR O PRODUTO, PREENCHA OS CAMPOS VAZIOS!</v-alert>
    </div>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nome"
              :rules="usernameRules"
              :counter="100"
              label="Nome"
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
              v-model="marca"
              :rules="usernameRules"
              :counter="50"
              label="Marca"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="valor"
              :rules="usernameRules"
              :counter="10"
              label="Valor"
              required
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="validade"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="validade" label="Validade do produto:" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="validade" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(validade)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="quantidade"
              :rules="usernameRules"
              label="Quantidade disponível"
              required
              type="number"
            ></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="setorSelecionado"
              :items="setores"
              item-text="name"
              label="Setor"
              return-object
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="imagem"
              :rules="usernameRules"
              :counter="200"
              label="Link da imagem do produto"
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
        <v-card-title>
          Lista de Produtos
          <v-spacer></v-spacer>
          <v-text-field
            v-model="pesquisar"
            append-icon="mdi-magnify"
            label="Pesquisar produto"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table :headers="cabecalho" :items="produtos" :search="pesquisar">
          <template v-slot:item.action="{ produto }" small>
            <v-btn icon @click="mostrarDialog(produto)">
              <v-icon  small class="mr-2" >{{disponivel}}</v-icon>
              
            </v-btn>
            <v-row justify="center">
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Olá Admin!</v-card-title>

                  <v-card-text>Deseja realmente alterar status do produto?</v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>

                    <v-btn color="green darken-1" text @click="statusProduto()">Aceitar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
          
        </v-data-table>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";
export default {
  data: () => ({
    disponivel: true,
    nome: "",
    marca: "",
    valor: "",
    quantidade: "",
    imagem: "",
    descricao: "",
    setor: "",
    validade: "",
    pesquisar: "",
    modal: false,
    disponivel: "mdi-cart",
    indisponivel: "mdi-cart-off",
    dialog: false,
    produtoStatus: null,

    produtos: [],
    setores: [],
    setorSelecionado: {},
    cabecalho: [
      {
        text: "nome",
        align: "center",
        value: "nome"
      },
      {
        text: "marca",
        align: "center",
        value: "marca"
      },
      {
        text: "valor",
        align: "center",
        value: "valor"
      },
      {
        text: "quantidade",
        align: "center",
        value: "quantidade"
      },
      {
        text: "imagem",
        align: "center",
        value: "imagem"
      },
      {
        text: "descricao",
        align: "center",
        value: "descricao"
      },
      // {
      //   text: 'setor',
      //   align: 'center',
      //   value: 'setor',
      // },
      {
        text: "validade",
        align: "center",
        value: "validade"
      },
      {
        text: "disponivel",
        align: "center",
        value: "action"
      }
      // {
      //   text: 'editar',
      //   align: 'center',
      //   value: 'editar',
      // },
    ],

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

          produto.nome = this.nome;
          produto.marca = this.marca;
          produto.valor = parseFloat(this.valor);
          produto.imagem = this.imagem;
          produto.setor = this.setorSelecionado;
          produto.quantidade = parseFloat(this.quantidade);
          produto.descricao = this.descricao;
          produto.status = this.disponivel;
          produto.validade = this.validade;

          HttpRequestUtil.adicionarProduto(produto).then(produto => {
            this.produtos.push(produto);
          });
          this.salvo = true;
        } else {
          this.produtoEditado.nome = this.nome;
          this.produtoEditado.marca = this.marca;
          this.produtoEditado.valor = parseFloat(this.valor);
          this.produtoEditado.quantidade = parseFloat(this.quantidade);
          this.produtoEditado.descricao = this.descricao;
          this.produtoEditado.imagem = this.imagem;
          this.produtoEditado.setor = this.setor;
          this.produtoEditado.validade = this.validade;

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
      this.nome = "";
      this.valor = "";
      this.quantidade = "";
      this.descricao = "";
      this.imagem = "";
      this.marca = "";
      // this.setor = this.setor;
      this.validade = "";
    },

    buscarProdutos() {
      HttpRequestUtil.buscarProdutos().then(produtos => {
        this.produtos = produtos;
      });
    },

    buscarSetores() {
      HttpRequestUtil.buscarSetores().then(setores => {
        this.setores = setores;
      });
    },

    validar() {
      if (
        this.nome == "" ||
        this.marca == "" ||
        this.valor == "" ||
        this.quantidade == "" ||
        this.descricao == "" ||
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

      this.nome = produto.nome;
      this.valor = parseFloat(produto.valor);
      this.marca = produto.marca;
      this.descricao = produto.descricao;
      this.quantidade = parseFloat(produto.quantidade);
      this.imagem = produto.imagem;
      this.validade = produto.validade;
    },

    statusProduto(produto) {
      produto.disponivel = !produto.disponivel;

      HttpRequestUtil.editarProduto(produto).then(produtos => {});
    },

    mostrarDialog(produto) {
      
      this.produtoStatus = produto
      this.dialog = true;
    },

    statusProduto( ){
      if(produtoStatus != null){
        this.produtoStatus.disponivel = !this.produtoStatus.disponivel

         HttpRequestUtil.mudarStatus(this.produtoStatus).then(produto => {
          this.produtoStatus = null
          this.buscarProdutos();
        });
      }
    }
  
  },

  

  mounted() {
    this.buscarProdutos();
    this.buscarSetores();
  }
};
</script>