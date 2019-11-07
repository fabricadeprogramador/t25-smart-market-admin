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
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Validade do produto:"
                  
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
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

        <v-data-table :headers="cabecalho" :items="produtos"  :search="pesquisar">
          <template v-slot:item.imagem="{item}">
         <v-img style="width: 100px" :src="item.imagem"></v-img>
          </template>

          <v-dialog v-model="dialog" persistent max-width="290">

          <template v-slot:item.disponivel="{ on }">
          <v-btn icon color="black" dark  @click="marcarProduto(produto)">
          <v-icon v-if="produto.ativo">{{disponivel}}</v-icon>
          <v-icon v-else>{{indisponivel}}</v-icon>
          </v-btn>

          <v-card>
          <v-card-title class="headline">Deseja alterar status do Produto?</v-card-title>
          <v-card-text>Tem certeza que deseja alterar o status do Produto?</v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelarAtivacao()">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="alterarStatus()">Aceito</v-btn>
          </v-card-actions>
          </v-card>
          </template>
          
          </v-dialog>                                                                                          

          <template v-slot:item.editar="{ on }">
          <v-btn icon color="black" dark  @click="editar">
          <v-icon >{{btnEditar}}</v-icon>
          </v-btn>
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
    nome: "",
    marca: "",
    valor: "",
    quantidade: "",
    imagem: "",
    descricao: "",
    setor: "",
    validade: "",
    pesquisar: "",

    date: new Date().toISOString().substr(0, 10),

    modal: false,
    ativo: true,
    dialog: false,

    btnEditar: "mdi-pencil",
    disponivel: "mdi-cart",
    indisponivel: "mdi-cart-off",

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
      {
        text: 'setor',
        align: 'center',
        value: 'setor',
      },
      {
        text: "validade",
        align: "center",
        value: "validade"
      },
      {
        text: "disponivel",
        align: "center",
        value: "disponivel"
      },
      {
        text: 'editar',
        align: 'center',
        value: 'editar',
      },
    ],

    produtoEditado: null,
    produtoAtivar: null,

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
      this.setor = this.setor;
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
        this.validade == "" ||
        this.setor == null
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


    marcarProduto(produto) {
        this.dialog = true;
        this.produtoAtivar = produto
      },

    cancelarAtivacao() {
        this.produtoAtivar = null
        this.dialog = false
      },
  
  alterarStatus() {

        if (this.produtoAtivar != null) {
          this.produtoAtivar.ativo = !this.produtoAtivar.ativo
          HttpRequestUtil.produtoStatus(this.produtoAtivar).then(produtos => {
            this.produtoAtivar = null
          });

          this.dialog = false

        }
      }
  },

  mounted() {
    this.buscarProdutos();
    this.buscarSetores();
  }
};
</script>