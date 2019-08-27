import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Produtos from './views/cadastro-produto.vue'
import Controle from './views/Controle.vue'
import Clientes from './views/Clientes.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {

    path: '/clientes',
    name: 'clientes',
    component: Clientes
  },
{ 

    path: '/produtos',
    name: 'produtos' , 
    component: Produtos
  },
  {
  path: '/controle',
  name: 'controle',
  component: Controle
}
]
 

})