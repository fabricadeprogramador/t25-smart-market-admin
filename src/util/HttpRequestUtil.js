const API_URL = "https://loja-ht-api-t23.herokuapp.com";

import axios from "axios";

export default {
  //Usuários
  async buscarUsuarios() {
    return axios.get(API_URL + "/usuarios").then(response => response.data);
  },

  async salvarUsuario(usuario) {
    return axios
      .post(API_URL + "/usuarios", usuario)
      .then(response => response.data);
  },

  async deletarUsuario(usuario) {
    return axios
      .delete(API_URL + "/usuarios", usuario)
      .then(response => response.data);
  },

  //Produtos
  async buscarProdutos() {
    return axios.get(API_URL + "/produtos").then(produto => produto.data);
  }
};
