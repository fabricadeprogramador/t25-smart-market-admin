<template>
  <div>
    <v-btn @click="buscarTodos">Buscar</v-btn>
    <v-btn @click="salvar">Salvar</v-btn>
    <v-btn @click="deletar">Deletar</v-btn>
  </div>
</template>

<script>
  import HttpRequestUtil from "@/util/HttpRequestUtil";

  export default {
    methods: {
      buscarTodos() {
        HttpRequestUtil.buscarUsuarios().then(usuarios => {
          alert(JSON.stringify(usuarios));
        });
      },

      salvar() {
        let usuario = {};
        usuario.ativo = true;
        usuario.username = "groselha";
        usuario.senha = "0987";
        usuario.tipo = "CLIENTE";

        HttpRequestUtil.salvarUsuario(usuario).then(usuario => {
          alert(JSON.stringify(usuario));
        });
      },

      deletar() {
        let usuario = {};
        usuario._id = "5d5f2f64e638d00017ad8f38";

        HttpRequestUtil.deletarUsuario(usuario).then(usuario => {
          alert(JSON.stringify(usuario));
        });
      }
    }
  };
</script>