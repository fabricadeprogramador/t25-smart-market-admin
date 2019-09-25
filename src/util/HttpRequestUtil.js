// const API_URL = "https://loja-ht-api-t23.herokuapp.com";
const API_URL = "http://localhost:3000";

import axios from "axios";
import {
  async
} from "q";

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
    return axios.get(API_URL + "/produto").then(produto => produto.data);
  },

  async editarProduto(produto) {
    return axios.put(API_URL + "/produto", produto).then(produto => produto.data)
  },
  async salvarProduto(produto) {
    return axios
      .post(API_URL + "/produto", produto)
      .then(response => response.data);
  },
  //Compras
  async buscarCompras() {
    return axios.get(API_URL + "/compras").then(compra => compra.data)
  },

  //Clientes
  async buscarClientes() {
    return axios.get(API_URL + "/clientes").then(cliente => cliente.data);
  },

  async salvarCliente(cliente) {
    return axios.post(API_URL + "/clientes", cliente).then(response => response.data);
  },

  //Contato
  async buscarContatos() {
    return axios.get(API_URL + "/contato").then(contato => contato.data);
  },

  //Login
  async autenticar() {
    return axios.post(API_URL + "/autenticar", autenticar).then(autenticar => autenticar.data);
  },

  //Departamentos
  async buscarDepartamentos() {
    return axios.get(API_URL + "/departamentos").then(departamentos => departamentos.data);
  }

}