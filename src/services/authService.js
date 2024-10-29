// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Adjust based on your backend

export const authService = {
  async register(userData) {
    return await axios.post(`${API_URL}/register`, userData);
  },
  
  async login(credentials) {
    return await axios.post(`${API_URL}/login`, credentials);
  },
  
  async getAllUsers() {
    // If your API allows fetching all users, you can call it here
    return await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },

  getCurrentUser() {
    console.log(localStorage.getItem('user'));
    
    return JSON.parse(localStorage.getItem('user'));
  },
};
