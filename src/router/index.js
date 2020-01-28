import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import AddItem from '@/components/AddItem'
import EditItem from '@/components/EditItem'
Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  // if (localStorage.getItem('jwt')) {
  if (true) {
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
          alias: '',
          component: EditItem
        }        
      ]
    }    
    // {
    //   path: '/HelloWorld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    //   // ,      beforeEnter: ifAuthenticated
    // },
    // {
    //   path:'/addItem',
    //   name:'AddItem',
    //   component: AddItem
    // }
  ]
})
