// src/store/order.js

import { fetchOrdersAPI, addOrdersAPI, getOrderByIdAPI, deleteOrderAPI, updateOrderAPI } from '../services/orderServices';

const state = {
  orders: [],
  selectedOrder: {},
  loading: false,
  error: null,
};

const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setSelectedOrder(state, selectedOrder) {
    state.selectedOrder = selectedOrder;
  },
  addOrder(state, order) { // Change from addOrders to addOrder
    state.orders.push(order); // Add a single order
  },
  removeOrder(state, orderId) {
    state.orders = state.orders.filter(order => order.id !== orderId);
  },
  updateOrder(state, updatedOrder) {
    const index = state.orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      state.orders.splice(index, 1, updatedOrder); // Update the order in the array
    }
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchOrders({ commit }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const orders = await fetchOrdersAPI();
      console.log(orders);
      commit('setOrders', orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addOrder({ commit }, order) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const newOrder = await addOrdersAPI(order); // Ensure the API returns the created order
      commit('addOrder', newOrder); // Use the returned newOrder from the API
      return newOrder; // Return the newly created order
    } catch (error) {
      console.error('Error adding order:', error);
      commit('setError', error);
      throw error; // Optionally throw the error to handle it in the calling component
    } finally {
      commit('setLoading', false);
    }
  },
  
  async getOrderById({ commit }, id) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const order = await getOrderByIdAPI(id); // Ensure to use the correct API function
      commit('setSelectedOrder', order);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async deleteOrder({ commit }, orderId) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      await deleteOrderAPI(orderId);
      commit('removeOrder', orderId);
    } catch (error) {
      console.error('Error deleting order:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async updateOrder({ commit }, { id, updatedOrder }) { // Accepting id and updatedOrder
    commit('setLoading', true);
    commit('setError', null);
    try {
      await updateOrderAPI(id, updatedOrder); // Call the API to update the order with id
      commit('updateOrder', updatedOrder); // Commit the mutation to update the order in the state
    } catch (error) {
      console.error('Error updating order:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  
};

const getters = {
  getOrders(state) {
    return state.orders;
  },
  getOrderById(state) {
    return state.selectedOrder;
  },
  isLoading(state) {
    return state.loading;
  },
  getError(state) {
    return state.error;
  },
};

export default {
  namespaced: true, // Enable namespacing for the module
  state,
  mutations,
  actions,
  getters,
};
