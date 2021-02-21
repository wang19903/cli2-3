import Vue from 'vue';
import Vuex from 'vuex';
import productModules from './products';
import cartsModules from './carts';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: [],
  },
  actions: {
    updataLoading(context, status) {
      context.commit('LOADING', status);
    },
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      const messages = {
        message,
        status,
        timestamp,
      };
      context.commit('MESSAGESPUSH', messages);
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessage(context, num) {
      context.commit('MESSAGEREMOVE', num);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit('MESSAGETIMEING', timestamp);
      }, 5000);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    MESSAGESPUSH(state, payload) {
      state.messages.push(payload);
    },
    MESSAGEREMOVE(state, payload) {
      state.messages.splice(payload, 1);
    },
    MESSAGETIMEING(state, payload) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.messages.splice(i, 1);
        }
      });
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    message: state => state.messages,
  },
  modules: {
    productModules,
    cartsModules,
  },
});
