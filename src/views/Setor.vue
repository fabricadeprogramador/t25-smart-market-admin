<template>
  <div>
    <div class="ma-12 elevation-1">
      <div class="text-center">
        <h1>Cadastro de Setores</h1>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="10"
                label="Nome do Setor"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn color="info" class="my-5" @click="salvar">Salvar</v-btn>
          </div>
        </v-container>
        <!--Lista de setores-->
      </v-form>
    </div>
    <div class="ma-12 elevation-1">
      <v-card>
        <v-list class="pa-12">
          <div class="text-center">
            <h1>Setores</h1>
          </div>

          <v-list-item flat class="title">
            <v-list-item-title md="2">SETOR</v-list-item-title>
          </v-list-item>


          <v-list-item v-for="setor in setores" :key="setor.title">
            <v-col md="11">
              <v-list-item-title>{{setor.name}}</v-list-item-title>​
            </v-col>

            <v-list-item-action>
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn icon  color="primary" dark v-on="on">
                    <v-icon v-if="setor.ativo" color="green">{{ativado}}</v-icon>
                    <v-icon v-else color="grey">{{desativado}}</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Deseja alterar status do Setor?</v-card-title>
                  <v-card-text>Tem certeza que deseja alterar o status do Setor?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false" >Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false & alterarStatus(setor)">Aceito</v-btn>
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
    ativado: "mdi-check-bold",
    desativado: "mdi-cancel",
    ativo: true,
    name: "",
    setores: [],
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

      HttpRequestUtil.salvarSetor(setor).then(response => {
        this.setores.push(response);
      });
    },
    buscarTodos() {
      HttpRequestUtil.buscarSetores().then(setores => {
        this.setores = setores;
      });
    },

    alterarStatus(setor) {
      setor.ativo = !setor.ativo;


      HttpRequestUtil.setorStatus(setor).then(setores => {});
    }
  },
  mounted() {
    this.buscarTodos();
  }
};
</script>

<style>
</style>