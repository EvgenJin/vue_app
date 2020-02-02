import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login : {},
    jwt:localStorage.getItem('jwt'),
    drawer: false,
    manufacturer: [],
    products: [],
    stores: [],
    models: []
  },
  getters: {
    login : state => {
      return state.login
    },
    drawer: state => {
      return state.drawer
    },
    manufacturer: state => {
      return state.manufacturer
    },
    products: state => {
      return state.products
    },
    storages: state => {
      return state.stores
    },
    models: state => {
      return state.models
    }
  },
  mutations: {
    set_login : (state, payload) => {
      state.login = payload
    },
    set_drawer: (state,payload) => {
      state.drawer = payload
    },
    set_manufacturer: (state,payload) => {
      state.manufacturer = payload
    },
    set_products: (state, payload) => {
      state.products = payload
    },
    set_models: (state,payload) => {
      state.models = payload
    },
    set_stores: (state,payload) => {
      state.stores = payload
    },

  },
  actions: {
    set_login: async ({commit}) => {
      try {
        let username = localStorage.getItem('login');
        let res = await fetch('http://localhost:3000/api/user/' + username)
          .then(res => res.json());
        commit('set_login', res)
      } catch(err) {
        console.log(err)
      }
    },
    set_manufacturer: async ({commit}) =>  {
      try {
        let res = await fetch('http://localhost:3000/api/manufacturers/all').then(res => res.json());
        commit('set_manufacturer', res)
      } catch(err) {
        console.log(err)
      }
    },
    set_products: async ({commit}) => {
      try {
        let res = await fetch('http://localhost:3000/api/products/all').then(res => res.json());
        commit('set_products',res)
      } catch (err) {
        console.log(err)
      }
    },
    set_models: async (context, name) => {
      try {
        let data = await fetch('http://localhost:3000/api/models/all').then(res => res.json());
        context.commit('set_models', data)
      }
      catch (err) {
        console.log(err)
      }
    },
    set_stores: async ({commit}) => {
      try {
        let res = await fetch('http://localhost:3000/api/stores/all').then(res => res.json());
        commit('set_stores',res);
      }
      catch (err) {
        console.log(err)
      }
    }
  },
});
