import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Produtos from './views/cadastro-produto.vue'
import Controle from './views/Controle.vue'

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