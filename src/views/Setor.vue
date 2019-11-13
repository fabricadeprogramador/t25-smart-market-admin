<template>
  <div>
    <div class="ma-12 elevation-1">
      <div class="text-center">
        <h1>Cadastro de Setores</h1>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <!-- Coluna label de nome do setor-->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="10"
                label="Nome do Setor"
                required
              ></v-text-field>
            </v-col>

            <!-- Coluna select de imagens -->

            <v-col cols="12" md="6 ">
              <v-dialog v-model="dialog" persistent max-width="500">
                <template v-slot:activator="{ on }">
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" style="padding: 5px 10px" v-on="on">
                      <v-card-text style="font-size: 12pt; color: gray; padding: 8px 0px;">
                        Selecione uma imagem
                        <v-icon style="padding: 0px 0px 0px 210px;">mdi-image-size-select-actual</v-icon>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </template>
                <v-card>
                  <v-card style="margin-top: 20px;">
                    <v-img src="https://cdn-statics.engenhariae.com.br/wp-content/uploads/2018/05/game-matem%C3%A1tica.jpg" height="150px"></v-img>
                  </v-card>

                  <v-card style="margin-top: 20px;">
                    <v-img src="https://abrilcasa.files.wordpress.com/2019/04/gourmand-brastemp.png?w=1024" height="150px"></v-img>
                  </v-card>

                  <v-card style="margin-top: 20px;">
                    <v-img src="https://abrilexame.files.wordpress.com/2018/10/iphone-xs-max.png" height="150px"></v-img>
                  </v-card>

                  <v-card style="margin-top: 20px;">
                    <v-img src="http://www.folhadoms.com.br/images/ms-supermercado.jpg" height="150px"></v-img>
                  </v-card>
        
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
          </div>
        </v-container>
      </v-form>
    </div>
    <div class="ma-12 elevation-1">
      <v-card>
        <!--Lista de setores-->
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

            <!-- Diálogo do confirmação do botão -->
            <v-list-item-action>
              <v-dialog v-model="dialog" persistent max-width="290">
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
    dialog: false,
    //icones
    ativado: "mdi-check-bold",
    desativado: "mdi-cancel",

    ativo: true,
    name: "",
    imagem: "",
    setorAtivar: null,
    //Arrays
    setores: [],
    //Objeto
    imagens: ["Ola", "blz"],
    nameRules: [
      v => !!v || "Nome do setor é obrigatório!",
      v => v.length <= 10 || "O nome do setor deve ter menos de 10 caracteres"
    ]
  }),
  methods: {
    salvar() {
      let setor = {};
      setor.ativo = this.ativo;
      setor.name = this.name;
      setor.imagem = this.imagem;

      HttpRequestUtil.salvarSetor(setor).then(response => {
        this.setores.push(response);
      });
    },
    buscarTodos() {
      HttpRequestUtil.buscarSetores().then(setores => {
        this.setores = setores;
      });
    },

    marcarAtivar(setor) {
      this.dialog = true;
      this.setorAtivar = setor;
    },

    cancelarAtivacao() {
      this.setorAtivar = null;
      this.dialog = false;
    },

    alterarStatus() {
      if (this.setorAtivar != null) {
        this.setorAtivar.ativo = !this.setorAtivar.ativo;
        HttpRequestUtil.setorStatus(this.setorAtivar).then(setores => {
          this.setorAtivar = null;
        });

        this.dialog = false;
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