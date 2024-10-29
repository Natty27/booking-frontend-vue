// src/store/customer.js

const state = {
    customers: [],
  };
  
  const mutations = {
    setCustomers(state, customers) {
      state.customers = customers;
    },
    addCustomer(state, customer) {
      state.customers.push(customer);
    },
    removeCustomer(state, customerId) {
      state.customers = state.customers.filter(customer => customer.id !== customerId);
    },
  };
  
  const actions = {
    fetchCustomers({ commit }) {
      // Logic for fetching customers (e.g., API call)
      const customers = []; // Replace with actual API response
      commit('setCustomers', customers);
    },
  };
  
  const getters = {
    getCustomers(state) {
      return state.customers;
    },
  };
  
  export default {
    namespaced: true, // Enable namespacing for the module
    state,
    mutations,
    actions,
    getters,
  };
  