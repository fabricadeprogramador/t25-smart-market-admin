<template>
<div>
  <div class="ma-12" >
    <!--FORMULÁRIO DE CADASTRO DE CLIENTES-->
    <v-form class="ma-12  elevation-5 pa-12" ref="form" v-model="valid" lazy-validation>
      <div class="text-center">
        <h1>Cadastro de Clientes</h1>
      </div>

      <v-text-field
        class="mx-10"
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Nome"
        required
      ></v-text-field>

      <v-text-field 
        class="mx-10" 
        v-model="email" 
        :rules="emailRules" 
        label="E-mail" 
        required
      ></v-text-field>

      <v-text-field
        class="mx-10"
        v-model="password"
        :rules="passwordRules"
        :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Senha"
        hint="Use oito ou mais caracteres"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <div class="mx-10">
        <v-btn :disabled="!valid"
               color="success" 
               class="mr-4" 
               @click="salvar"
               >
               Salvar
        </v-btn>

        <v-btn color="error"
               class="mr-4" 
               @click="cancelar"
               >
               Cancelar
        </v-btn>
      </div>
    </v-form>
  </div>
  <!--LISTA DE CLIENTES-->
  <div class="ma-12">
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-5 ma-12"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-list-item-icon>
            <v-icon> mdi-account</v-icon>
          </v-list-item-icon>
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="name usuario"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</div>
</template>
<script>
//ACESSO A API
import HttpRequestUtil from "@/util/HttpRequestUtil";
import { stringify } from 'querystring';

export default {
  data: () => ({
    valid: true,
    clientes: [],
    name: "",
    nameRules: [
      v => !!v || "Nome é obrigatório!",
      v => (v && v.length <= 20) || "Nome deve ter no máximo 20 caracteres!"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail é obrigatório!",
      v => /.+@.+\..+/.test(v) || "E-mail invalido"
    ],
    show1: false,
    password: "",
    passwordRules: [
      v => !!v || "Senha é obrigatório!.",
      v => v.length >= 8 || "Min 8 caracteres"
    ],
    //SCRIPT DA LISTA DE CLIENTES CADASTRADOS
    dialog: false,
      headers: [
        {

          text: 'Nome de Usuários',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'E-mail', value: 'email' },
        { text: '', value: 'action', sortable: false },

      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: 0,
      },
      defaultItem: {
        name: '',
        email: 0,
      },
    }),
  
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },
  methods: {
    //MÉTODOS DE CADASTRO
    dados() {
      let usuario = {}
      usuario.ativo = true
      usuario.name = this.name
      usuario.email = this.email
      usuario.password = this.password
      usuario.tipo = "CLIENTE"
      
      return usuario
    },
    salvar() {
      
      if (this.$refs.form.validate()) {
        let usuario = this.dados
        
        HttpRequestUtil.salvarUsuario(usuario).then(usuario => {
        alert(JSON.stringify(usuario));
        });
      }
    },
          salvar1() {
        let usuario = {};
        usuario.ativo = true;
        usuario.username = "groselha";
        usuario.senha = "0987";
        usuario.tipo = "CLIENTE";

        HttpRequestUtil.salvarUsuario(usuario).then(usuario => {
          alert(JSON.stringify(usuario));
        });
      },

    cancelar() {

    },
    //MÉTODOS DA LISTA DE CLIENTES CADASTRADOS
    initialize () {
        this.desserts = [
          {
            name: 'Felipe',
            email: 'felipe@gmail.com',
          },
          {
            name: 'João',
            email: 'joao@gmail.com',
          },
          {
            name: 'Maria',
            email: 'maria@gmail.com',
          },
        ]
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Tem certeza de que deseja excluir este usuário?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>