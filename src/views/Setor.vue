<template>
  <div>
    <div>
      <!-- Alert -->
      <v-snackbar
        type="info"
        v-model="salvo"
        close-text="Close Alert"
        color="info"
        :top="y === 'top'"
      >
        SETOR CADASTRADO COM SUCESSO
        <v-btn dark text @click="salvo = false">Fechar</v-btn>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar
        type="info"
        v-model="naoCadastrado"
        close-text="Close Alert"
        color="red"
        :top="y === 'top'"
      >
        NÃO FOI POSSÍVEL CADASTRAR O SETOR, PREENCHA O(S) CAMPO(S) VAZIOS!
        <v-btn dark text @click="naoCadastrado = false">Fechar</v-btn>
      </v-snackbar>
    </div>

    <!-- Cadastro -->
    <div class="ma-6 elevation-2">
      <div class="text-center pa-4">
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

            <!-- Coluna selecionar imagens -->
            <v-col cols="12" md="6">
              <v-menu transition="slide-x-reverse-transition">
                <template v-slot:activator="{ on }">
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" height="50" class="pa-3" v-on="on">
                      <div v-if="imgAtiva" class="d-flex" flat tile>
                        <div outlined tile width="200">
                          <p class="green--text">Imagem selecionada</p>
                        </div>
                        <v-spacer></v-spacer>
                        <div outlined tile width="200">
                          <v-img :src="imagem" class="mt-1" height="20" width="20"></v-img>
                        </div>
                      </div>
                      <div v-else class="d-flex" flat tile>
                        <span>Selecione uma imagem</span>
                        <v-spacer></v-spacer>
                        <v-icon>mdi-image-size-select-actual</v-icon>
                      </div>
                    </v-card>
                  </v-hover>
                </template>

                <!-- Lista de Imagens -->
                <v-card width="450" class="pa-4">
                  <div class="text-center">
                    <h1>Selecione uma imagem</h1>
                  </div>
                  <div v-for="imagem in imagens" :key="imagem">
                    <v-hover v-slot:default="{ hover }">
                      <v-col cols="12">
                        <v-card class="mt-2" :elevation="hover ? 12 : 2">
                          <v-img :src="imagem" height="100" @click="selecionarImage(imagem)"></v-img>
                        </v-card>
                      </v-col>
                    </v-hover>
                  </div>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>

          <!-- Botoẽs -->
          <div class="text-center">
            <v-btn color="red" class="white--text" @click="cancelarCampos">Cancelar</v-btn>
            <v-btn color="info" class="my-5 ml-5" @click="salvar">Salvar</v-btn>
          </div>
        </v-container>
      </v-form>
    </div>

    <!--Lista de setores cadastrados-->
    <div class="ma-6 elevation-1">
      <v-card>
        <div class="text-center pt-4">
          <h1>Setores</h1>
        </div>
        <v-simple-table light>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">SETOR</th>
                <th class="text-center">IMAGEM</th>
                <th class="text-center">ATIVAR/INATIVAR</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tbody>
              <tr v-for="setor in setores" :key="setor._id">
                <td class="text-center">{{ setor.name }}</td>
                <td class="text-center">
                  <img :src="setor.imagem" width="20" height="20" alt />
                </td>
                <!-- Dialog de confirmação -->
                <td class="text-center">
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
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
    naoCadastrado: false,
    salvo: false,
    y: "top",

    //Imagens
    imagens: [
      "https://cdn-statics.engenhariae.com.br/wp-content/uploads/2018/05/game-matem%C3%A1tica.jpg",
      "https://abrilcasa.files.wordpress.com/2019/04/gourmand-brastemp.png?w=1024",
      "https://abrilexame.files.wordpress.com/2018/10/iphone-xs-max.png",
      "http://www.folhadoms.com.br/images/ms-supermercado.jpg",
      "https://file-service.riooportunidadesdenegocios.com.br/images/741x371/6705de0e-b304-4ef5-978a-0050d7426d93.jpg"
    ],

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
            this.salvo = true;
          });
        }
        this.cancelarCampos();
      }else {
        this.naoCadastrado = true;
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
      this.name = "";
      this.imagem = "";
      this.imgAtiva = false;
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