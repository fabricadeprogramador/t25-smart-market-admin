<template>
  <v-list-item-group class="mx-2 my-4">
    <v-snackbar type="info" v-model="salvo" close-text="Close Alert" color="red" :top="y === 'top'">
      RESPOSTA JÁ ENVIADA!
      <v-btn dark text @click="salvo = false">Fechar</v-btn>
    </v-snackbar>

    <template v-for="(item, index) in items">
      <v-list-item :key="item.cliente">
        <v-list-item-content>
          <v-list-item-title class="title ml-3 mr-5">
            Cliente:
            <v-list-item-title class="font-weight-light">{{item.cliente}}</v-list-item-title>
          </v-list-item-title>
          <v-container fluid>
            <v-row>
              <v-col cols="10">
                <v-list-item-title class="title ml-3 mr-5">
                  Assunto:
                  <v-list-item-subtitle class="font-weight-light" v-text="item.assunto"></v-list-item-subtitle>
                </v-list-item-title>
              </v-col>
              <v-col cols="2" align="right">
                <v-list-item-action-text v-text="item.datacontato"></v-list-item-action-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-list-item-title class="title ml-3 mr-5">Mensagem:</v-list-item-title>
                <v-list-item-action-text v-text="item.mensagem"></v-list-item-action-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="9">
                <v-list-item-title class="title ml-3 mr-5">Resposta:</v-list-item-title>
                <v-list-item-subtitle v-text="item.resposta"></v-list-item-subtitle>
              </v-col>

              <v-col cols="1" align="right">
                <v-icon v-if="!item.respondido" color="grey lighten-1">mdi-star-outline</v-icon>

                <v-icon v-else color="green">mdi-star</v-icon>
              </v-col>

              <v-col cols="2" align="right">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <!-- dark v-on="on" -->
                    <v-btn color="primary" @click="responder(item._id)">Responder</v-btn>
                  </template>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-textarea
                              v-model="textoresposta"
                              rows="15"
                              label="Resposta"
                              :rules="respostaRules"
                              :maxlength="max"
                              :counter="150"
                              required
                            >
                              <v-btn dark text @click="snackbar = false">Close</v-btn>
                            </v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="enviarResposta()">Enviar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
    </template>
  </v-list-item-group>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";
export default {
  data: () => ({
    idContato: "1",
    textoresposta: "",
    dialog: false,
    salvo: false,

    selected: [2],
    max: 150,
    items: [],
    indiceResposta: null,

    timeout: 6000,

    y: "top",

    respostaRules: [
      v => !!v || "Preencha o campo resposta",
      v => v.length >= 20 || "A resposta deve ter no mínimo 20 caractetes"
    ]
  }),
  methods: {
    responder(idContato) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]._id == idContato) {
          if (this.items[i].respondido) {
            // alert("Resposta já enviada anteriormente" + this.dialog);
            this.salvo = true;
            document.getElementById("divAlert").focus()
          } else {
            (this.indiceResposta = idContato), (this.dialog = true);
          }
        }
      }
    },
    enviarResposta() {
      if (this.textoresposta.length < 20) {
        // alert("A resposta deve conter no mínimo 20 caracteres")
      } else {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i]._id == this.indiceResposta) {
            this.items[i].resposta = this.textoresposta;
            this.items[i].respondido = true;
            this.indiceResposta = null;
            this.dialog = false;
            this.textoresposta = "";
          }
          this.salvarResposta(this.items[i]);
          // HttpRequestUtil.buscarContatos().then(response => {
          //   this.items = response;
          // });
          this.buscarContatos();
        }
      }
    },
    salvarResposta(contato) {
      HttpRequestUtil.salvarResposta(contato).then(response => {
        this.buscarContatos();
      });
    },

    buscarContatos() {
      HttpRequestUtil.buscarContatos().then(response => {
        this.items = response;
      });
    }
  },
  mounted() {
    HttpRequestUtil.buscarContatos().then(response => {
      this.items = response;
    });
  }
};
</script>

<style>
</style>
