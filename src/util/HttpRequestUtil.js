const API_URL = "https://loja-ht-api-t23.herokuapp.com";

import axios from "axios";
import { async } from "q";

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

  async editarProduto(produto){
    return axios.put(API_URL + "/produtos", produto).then(produto => produto.data)
  },
  async salvarProduto(produto) {
    return axios
      .post(API_URL + "/produtos", produto)
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
<<<<<<< HEAD
  async autenticar() {
    return axios.post(API_URL + "/autenticar", autenticar).then(autenticar => autenticar.data);
  },

  async buscarDepartmentos(){
    return axios.get(API_URL + "/departamentos").then(re)
=======
  async autenticar(usuario) {
    return axios.post(API_URL + "/autenticar", usuario).then(response => response.data);
>>>>>>> caed4c8d2386fba961a31b740ce79c7d8b856360
  }
  
}
