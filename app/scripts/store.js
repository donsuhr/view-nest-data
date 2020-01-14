/* globals process */
import Vue from 'vue';
import Vuex from 'vuex';
import { store as nestDataStore } from './nest-data-store';

Vue.use(Vuex);

export default function createStore() {
  const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      nestData: nestDataStore,
    },
  });

  return store;
}
