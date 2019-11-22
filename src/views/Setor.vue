<template>
  <div>
    <div class="ma-12 elevation-1">
      <div class="text-center">
        <h1>Cadastro de Setores</h1>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>

            <!-- Coluna Input de nome do setor-->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="20"
                label="Nome do Setor"
                required
              ></v-text-field>
            </v-col>

            <!-- Coluna Dialog de imagens -->
            <v-col cols="12" md="6 ">
              <v-dialog v-model="dialogImage" persistent max-width="500">
                <template v-slot:activator="{ on }">
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" style="padding: 5px 10px" v-on="on">
                      <v-card-text style="font-size: 12pt; color: gray; padding: 8px 0px;">
                        Selecione uma imagem
                        <v-icon 
                          v-if="imgAtiva"
                          style="padding: 0px 0px 0px 210px;"
                          >
                          mdi-check
                        </v-icon>
                        <v-icon 
                          v-else
                          style="padding: 0px 0px 0px 210px;"
                        >
                          mdi-image-size-select-actual
                        </v-icon>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </template>
                <v-card class="pb-4">

                  <!-- Card do dialog -->
                  <div class="text-center pt-4">
                    <v-icon style="margin: 0px 0px 0px 430px" @click="cancelarImage()">
                      mdi-close-circle
                    </v-icon>
                    <h1>Selecione uma imagem</h1>
                  </div>
                  <v-card style="margin: 20px 10px 0px;">
                    <v-img
                      :src="img1"
                      height="150px"
                      @click="selecionarImage(img1)"
                    ></v-img>
                  </v-card>

                  <v-card style="margin: 20px 10px 0px;">
                    <v-img
                      :src="img2"
                      height="150px"
                      @click="selecionarImage(img2)"
                    ></v-img>
                  </v-card>

                  <v-card style="margin: 20px 10px 0px;">
                  <v-img
                    :src="img3"
                    height="150px"
                    @click="selecionarImage(img3)"
                  ></v-img>
                  </v-card>

                  <v-card style="margin: 20px 10px 0px;">
                    <v-img
                      :src="img4"
                      height="150px"
                      @click="selecionarImage(img4)"
                    ></v-img>
                  </v-card>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn color="red" style="color: white" @click="cancelarCampos">Cancelar</v-btn>
            <v-btn color="info" class="my-5 ml-5" @click="salvar">Salvar</v-btn>
          </div>
        </v-container>
      </v-form>
    </div>

    <!--Lista de setores-->
    <div class="ma-12 elevation-1">
      <v-card>
        <v-list class="pa-12">
          <div class="text-center">
            <h1>Setores</h1>
          </div>

          <v-list-item flat class="title">
            <v-list-item-title md="2">SETOR</v-list-item-title>
          </v-list-item>

          <v-list-item v-for="setor in setores" :key="setor._id">
            <v-col md="11">
              <v-list-item-title>{{setor.name}}</v-list-item-title>​
            </v-col>

            <!-- Dialog de confirmação -->
            <v-list-item-action>
              <v-dialog v-model="dialogAtivacao" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn icon color="primary" dark v-on="on" @click="marcarAtivar(setor)">
                    <v-icon v-if="setor.ativo" color="green">{{ativado}}</v-icon>
                    <v-icon v-else color="grey">{{desativado}}</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Deseja alterar status do Setor?</v-card-title>
                  <v-card-text>Tem certeza que deseja alterar o status do Setor?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="cancelarAtivacao()">Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="alterarStatus()">Aceito</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  data: () => ({
    valid: false,
    dialogAtivacao: false,
    dialogImage: false,
    imgAtiva: false,

    //Imagens
    img1: "https://cdn-statics.engenhariae.com.br/wp-content/uploads/2018/05/game-matem%C3%A1tica.jpg",
    img2: "https://abrilcasa.files.wordpress.com/2019/04/gourmand-brastemp.png?w=1024",
    img3: "https://abrilexame.files.wordpress.com/2018/10/iphone-xs-max.png",
    img4: "http://www.folhadoms.com.br/images/ms-supermercado.jpg",

    //Icones
    ativado: "mdi-check-bold",
    desativado: "mdi-cancel",

    //Variáveis do setor
    ativo: true,
    name: "",
    imagem: "",
    setorAtivar: null,
    salvo: false,

    //Arrays
    setores: [],

    nameRules: [
      v => !!v || "Nome do setor é obrigatório!",
      v => v.length <= 20 || "O nome do setor deve ter menos de 20 caracteres"
    ]
  }),
  methods: {
    salvar() {
      let valido = this.validarCampos();

      if (valido) {
        if (this.setorEditado == null) {
          let setor = {};
          setor.ativo = this.ativo;
          setor.name = this.name;
          setor.imagem = this.imagem;

          HttpRequestUtil.salvarSetor(setor).then(response => {
            this.setores.push(response);
          });
        }
      }
    },

    validarCampos() {
      if (
        this.name == "" ||
        this.setores.name & (this.imagem == "") ||
        this.setores.imagem
      ) {
        return false;
      }
      return true;
    },

    selecionarImage(image) {
      this.imagem = image;
      this.dialogImage = false;
      this.imgAtiva = true;
    },

    editar(setor) {
      this.setorEditado = setor;

      this.name = setor.name;
      this.imagem = setor.imagem;
    },

    buscarTodos() {
      HttpRequestUtil.buscarSetores().then(setores => {
        this.setores = setores;
      });
    },

    marcarAtivar(setor) {
      this.dialogAtivacao = true;
      this.setorAtivar = setor;
    },

    cancelarCampos() {
      this.name = ""
    },

    cancelarImage() {
      this.dialogImage = false;
    },

    cancelarAtivacao() {
      this.setorAtivar = null;
      this.dialogAtivacao = false;
    },

    alterarStatus() {
      if (this.setorAtivar != null) {
        this.setorAtivar.ativo = !this.setorAtivar.ativo;
        HttpRequestUtil.setorStatus(this.setorAtivar).then(setores => {
          this.setorAtivar = null;
        });

        this.dialogAtivacao = false;
      }
    }
  },
  mounted() {
    this.buscarTodos();
  }
};
</script>

<style>
</style>