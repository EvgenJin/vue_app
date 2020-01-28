import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login : 'empty',
    drawer: false,
    manufacturer: [],
    products: [],
    stores: [],
    models: []
  },
  getters: {
    LOGIN : state => {
      return state.login
    },
    DRAWER: state => {
      return state.drawer
    },
    MANUFACTURER: state => {
      return state.manufacturer
    },
    PRODUCTS: state => {
      return state.manufacturer
    },
    storages: state => {
      return state.stores
    },
    models: state => {
      return state.models
    }
  },
  mutations: {
    SET_LOGIN : (state, payload) => {
      state.login = payload
    },
    SET_DRAWER: (state,payload) => {
      state.drawer = payload
    },
    SET_MANUFACTURER: (state,payload) => {
      state.manufacturer = payload
    },
    set_models: (state,payload) => {
      state.models = payload
    },
    set_stores: (state,payload) => {
      state.stores = payload
    },

  },
  actions: {
    async SETMANUFACTURER({commit}) {
      try {
        let res = await fetch('http://localhost:3000/api/manufacturers/all').then(res => res.json());
        commit('SET_MANUFACTURER', res)
      } catch(err) {
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
        console.log(res)
        commit('set_stores',res);
      }
      catch (err) {
        console.log(err)
      }
    }
  },
});
