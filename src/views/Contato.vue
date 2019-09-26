<template>
  <v-list-item-group class="mx-2 my-4">
    <template v-for="(item, index) in items">
      <v-list-item :key="item.cliente">
        <template>
          <v-list-item-content>
            <v-list-item-title v-text="item.cliente"></v-list-item-title>
            <v-conteiner fluid>
              <v-row>
                <v-col cols="10">
                  <v-list-item-subtitle class="text--primary" v-text="item.assunto"></v-list-item-subtitle>
                </v-col>
                <v-col cols="2" align="right">
                  <v-list-item-action-text v-text="item.datacontato"></v-list-item-action-text>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12">
                  <v-list-item-subtitle v-text="item.mensagem"></v-list-item-subtitle>
                </v-col>
               </v-row>

              <v-row>
                <v-col cols="9">
                  <v-list-item-subtitle v-text="item.resposta"></v-list-item-subtitle>
                </v-col>

                <v-col cols="1" align="right">
                  <v-icon v-if="!item.respondido" color="grey lighten-1">
                    mdi-star-outline
                   
                  </v-icon>

                  <v-icon v-else color="green">
                    mdi-star
                  </v-icon>
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
                              ></v-textarea>
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
            </v-conteiner>
          </v-list-item-content>
        </template>
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
    selected: [2],
    max: 150,
    items: [],

    respostaRules: [
        v => !!v || 'Preencha o campo resposta',
        v => v.length >= 20 || 'A resposta deve ter no mínimo 20 caractetes',
      ],
  }),
  methods: {
    responder(idContato) {
       for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]._id == idContato) {
          if (this.items[i].respondido) {
            alert("Resposta já enviada anteriormente")
            this.dialog = false
          }else{
            (this.indiceResposta = idContato), (this.dialog = true);
          }
        }
      }


    },
    enviarResposta() {
      if (this.textoresposta.length < 20){
        // alert("A resposta deve conter no mínimo 20 caracteres")
      }else{
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i]._id == this.indiceResposta) {
            this.items[i].resposta = this.textoresposta;
            this.items[i].respondido = true;
            this.indiceResposta = "";
            this.dialog = false;
            this.textoresposta = "";
          }
        }
      }
    }
  },
  mounted(){
    HttpRequestUtil.buscarContatos().then(response => {
      this.items = response
    })
  }
};
</script>

<style>
</style>