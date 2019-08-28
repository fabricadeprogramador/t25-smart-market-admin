import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Produtos from './views/Produto.vue'
import Clientes from './views/Clientes.vue'
import Controle from './views/Controle.vue'
import Usuario from './views/Usuario.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
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
    }
  ]
})