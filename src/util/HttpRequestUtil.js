<<<<<<< HEAD

const API_URL = "http://localhost:3000";

import axios from "axios";
// import {
//   async
// } from "q";
=======
const API_URL = "http://localhost:3000";

import axios from "axios";
import { async } from "q";
>>>>>>> 4934913bcd51bc19a7cdfa31c7ef442ccd1c5147

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
  },

  async editarProduto(produto) {
<<<<<<< HEAD
    return axios.put(API_URL + "/produtos", produto).then(produto => produto.data)
=======
    return axios
      .put(API_URL + "/produto", produto)
      .then(produto => produto.data);
>>>>>>> 4934913bcd51bc19a7cdfa31c7ef442ccd1c5147
  },
  async salvarProduto(produto) {
    return axios
      .post(API_URL + "/produtos", produto)
      .then(response => response.data);
  },
  //Compras
  async buscarCompras() {
    return axios.get(API_URL + "/compras").then(compra => compra.data);
  },

  //Clientes
  async buscarClientes() {
    return axios.get(API_URL + "/clientes").then(cliente => cliente.data);
  },

  async salvarCliente(cliente) {
    return axios
      .post(API_URL + "/clientes", cliente)
      .then(response => response.data);
  },

  //Contato
  async buscarContatos() {
    return axios.get(API_URL + "/contato").then(contato => contato.data);
  },

  //Contato Salvar
  async salvarResposta(item){
    return axios.put(API_URL + "/contato", item).then(contato => contato.data);
  },

  //Login
  async autenticar() {
    return axios
      .post(API_URL + "/autenticar", autenticar)
      .then(autenticar => autenticar.data);
  },

  //Departamentos
  async buscarDepartamentos() {
    return axios
      .get(API_URL + "/departamentos")
      .then(departamentos => departamentos.data);
  }
};
