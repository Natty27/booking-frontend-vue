// src/store/index.js

import { createStore } from 'vuex';
import auth from './auth';
import customer from './customer';
import hotel from './hotel';
import order from './order';
import comment from './comment';

const store = createStore({
  modules: {
    auth,
    customer,
    hotel,
    order,
    comment,
  },
});

export default store;
