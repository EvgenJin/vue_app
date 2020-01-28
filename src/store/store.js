import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login : 'empty',
    drawer: false,
    manufacturer: [
      {id:1,name:"hp"},
      {id:2,name:"lenovo"},
      ],
    products: [
      {id:1,name:"hp1",manufacturer:"hp"},
      {id:2,name:"hp1",manufacturer:"hp"},
      {id:3,name:"hp3",manufacturer:"hp"}
    ],
    storages: [
      {id:1,name:"Татищева",address:"Татищева 3"},
      {id:2,name:"Мичурина",address:"Мичурина 6"},
    ]
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
    }
  },
  actions: {
    // async SETMANUFACTURER({commit}) {
    //   try {
    //     let res = await Vue.axios.get('/products/')
    //     commit('LOAD_ALL_PRODUCTS', res.data)
    //   } catch(err) {
    //     console.log(err)
    //   }
    // }
  },
});
