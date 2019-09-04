import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Produtos from './views/Produto.vue'
import Clientes from './views/Clientes.vue'
import Controle from './views/Controle.vue'
import Usuario from './views/Usuario.vue'
<<<<<<< HEAD
import Compras from './views/Compras.vue'
=======
import Contato from './views/Contato.vue'
>>>>>>> 290620e4533b6c3d3e691fd13511aa9f5393e1e8

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
<<<<<<< HEAD
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
  },
  {

    path: '/compras',
    name: 'Compras',
    component: Compras
  }
=======
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
    },
    {
      path: '/contato',
      name: 'Contato',
      component: Contato
    }
>>>>>>> 290620e4533b6c3d3e691fd13511aa9f5393e1e8
  ]
})