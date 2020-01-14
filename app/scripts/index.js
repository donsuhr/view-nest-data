import Vue from 'vue';

import createStore from './store';
import App from './App';

const el = '#app';

const store = createStore();

// eslint-disable-next-line  no-new
new Vue({
  el,
  store,
  render: (h) => h(App, {}),
});
