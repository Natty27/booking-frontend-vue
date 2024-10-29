import axios from 'axios';

const API_URL = 'http://localhost:3000/order'; // Update with your actual API endpoint

// Fetch orders (no token required)
export const fetchOrdersAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Adjust according to your API's response structure
};

// Add a new order (no token required)
export const addOrdersAPI = async (orderFormData) => {
  try {
    const response = await axios.post(API_URL, orderFormData, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type for JSON data
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

// Get order by ID (no token required)
export const getOrderByIdAPI = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data; // Adjust according to your API's response structure
};

// Update order (no token required)
export const updateOrderAPI = async (id, updatedOrder) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedOrder, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type for JSON data
      },
    });
    return response.data; // Adjust according to your API's response structure
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Delete order (token required)
export const deleteOrderAPI = async (orderId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  await axios.delete(`${API_URL}/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  // No return is needed; just handle confirmation if necessary
};
