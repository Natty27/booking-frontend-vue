// src/store/hotel.js

import { fetchHotelsAPI, addHotelsAPI, getHotelByIdAPI, deleteHotelAPI } from '../services/hotelServices';

const state = {
  hotels: [],
  selectedHotel:{},
  loading: false,
  error: null,
};

const mutations = {
  setHotels(state, hotels) {
    state.hotels = hotels;
  },
  setSelectedHotel(state, selectedHotel) {
    state.selectedHotel = selectedHotel;
  },
  addHotels(state, hotels) {
    state.hotels.push(...hotels); // Add multiple hotels
  },
  removeHotel(state, hotelId) {
    state.hotels = state.hotels.filter(hotel => hotel.id !== hotelId);
  },
  updateHotel(state, updatedHotel) {
    const index = state.hotels.findIndex(hotel => hotel.id === updatedHotel.id);
    if (index !== -1) {
      state.hotels.splice(index, 1, updatedHotel); // Update the hotel in the array
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
  async fetchHotels({ commit }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const hotels = await fetchHotelsAPI();
      console.log(hotels);
      commit('setHotels', hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addHotels({ commit }, hotels) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      await addHotelsAPI(hotels);
      commit('addHotels', hotels);
    } catch (error) {
      console.error('Error adding hotels:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async getHotelById({ commit }, id) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const hotel = await getHotelByIdAPI(id); // Ensure to use the correct API function
      commit('setSelectedHotel', hotel);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async deleteHotel({ commit }, hotelId) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      await deleteHotelAPI(hotelId);
      commit('removeHotel', hotelId);
    } catch (error) {
      console.error('Error deleting hotel:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
};

const getters = {
  getHotels(state) {
    return state.hotels;
  },
  getHotelById (state)  {
    return state.selectedHotel;
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
