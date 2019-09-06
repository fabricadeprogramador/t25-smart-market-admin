<template>

      <v-list-item-group v-model="selected" multiple active-class="green--text">
        <template v-for="(item, index) in items">
          <v-list-item :key="item.cliente">
            <template v-slot:default="{ active, toggle }">
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
                  <v-col cols="9">
                    <v-list-item-subtitle v-text="item.mensagem"></v-list-item-subtitle>
                  </v-col>

                  <v-col cols="1" align="right"> 
                    <v-icon v-if="!active" color="grey lighten-1">
                      {{ item.icon }}
                      star_border
                    </v-icon>

                    <v-icon v-else color="yellow">
                      {{ item.icon }}
                      star
                    </v-icon>
                  </v-col>

                  <v-col cols="2" align="right">
                    <v-dialog v-model="dialog" persistent max-width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Responder</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-text-field label="Email*" required></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field label="Assunto" type="password" required></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                          <v-btn color="blue darken-1" text @click="dialog = false">Enviar</v-btn>
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
export default {
  data: () => ({
    dialog: false,
    selected: [2],
    items: [
      {
        icon: "mdi-star",
        datacontato: "03/09/2019 21:00am",
        assunto: "Assunto",
        cliente: "Cliente 1",
        mensagem:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        icon: "mdi-star",
        datacontato: "04/09/2019 21:00am",
        assunto: "Assunto",
        title: "Cliente 2",
        mensagem:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        icon: "mdi-star",
        datacontato: "05/09/2019 21:00am",
        assunto: "Assunto",
        title: "Cliente 3",
        mensagem:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      }
    ]
  })
};
</script>

<style>
</style>