import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Produtos from './views/Produto.vue'
import Clientes from './views/Clientes.vue'
import Controle from './views/Controle.vue'
import Usuario from './views/Usuario.vue'
import Contato from './views/Contato.vue'
import Compras from './views/Compras.vue'
import Login from './views/Login.vue'
import Setor from './views/Setor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{


      path: '/home',
      name: 'Home',
      component: Home
    },
    {


      path: '/clientes',
      name: 'clientes',
      component: Clientes
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: Produtos
    },
    {
      path: '/controle',
      name: 'Controle',
      component: Controle
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuario
    },
    {

      path: '/compras',
      name: 'Compras',
      component: Compras
    },
    {
      path: '/contato',
      name: 'Contato',
      component: Contato
    },
    {
      path: '/setores',
      name: 'Setores',
      component: Setor
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})