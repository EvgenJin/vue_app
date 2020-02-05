import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import AddItem from '@/components/AddItem'
import EditItem from '@/components/EditItem'
import ListProducts from "../components/ListProducts";
import ListStores from "../components/ListStores";
import ListTransfers from "../components/ListTransfers";
import ProductPage from "../components/ProductPage";
import ListModels from "../components/ListModels";
Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('jwt') && localStorage.getItem('login')) {
    next();
    return
  }
  next('/Login');
};

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: 'addItem',
          name: 'AddItem',
          alias: '',
          component: AddItem
        },
        {
          path: 'EditItem',
          name: 'EditItem',
          component: EditItem
        },
        {
          path: 'ListProducts',
          name: 'ListProducts',
          component: ListProducts
        },
        {
          path: 'ListStores',
          name: 'ListStores',
          component: ListStores
        },
        {
          path:'ListTransfers',
          name:'ListTransfers',
          component: ListTransfers
        },
        {
          path:'ProductPage',
          name:'ProductPage',
          component: ProductPage
        },
        {
          path:'ListModels',
          name:'ListModels',
          component: ListModels
        }
      ]
    }
  ]
})
