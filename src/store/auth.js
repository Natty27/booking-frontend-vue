import { authService } from '../services/authService'; // Import the auth service
import router  from './../router'; // Import the router

const state = {
  user: null,
  isAuthenticated: false,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.isAuthenticated = !!user; // Set authentication status based on user
  },
  clearUser(state) {
    state.user = null;
    state.isAuthenticated = false;
    localStorage.removeItem('user'); // Clear user from localStorage
    localStorage.removeItem('token'); // Clear token from localStorage
  },
};

const actions = {
  async register({ commit }, userData) {
    try {
      const response = await authService.register(userData);
      commit('setUser', response.data.user); // Store user details in Vuex
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localStorage
    } catch (error) {
      console.error('Registration error:', error.response.data.message || error.message);
      throw error; // Optionally handle the error
    }
  },

  async login({ commit }, credentials) {
    try {
      const response = await authService.login(credentials);
      commit('setUser', response.data.user); // Store user details in Vuex
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localStorage
    } catch (error) {
      console.error('Login error:', error.response.data.message || error.message);
      throw error; // Optionally handle the error
    }
  },

  async getAllUsers({ commit }) {
    try {
      const response = await authService.getAllUsers();
      return response.data; // Return the list of users
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Optionally handle the error
    }
  },

  getCurrentUser({ commit }) {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
    if (user) {
      commit('setUser', user);
    }
    return user; // Return the current user
  },

  logout({ commit }) {
    commit('clearUser');
    router.push('/'); // Redirect to home page after logout
  },
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getUser(state) {
    return state.user;
  },
};

export default {
  namespaced: true, // Enable namespacing for the module
  state,
  mutations,
  actions,
  getters,
};
