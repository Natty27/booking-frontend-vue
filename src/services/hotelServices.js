import axios from 'axios';

const API_URL = 'http://localhost:3000/hotel'; // Update with your actual API endpoint

// Fetch hotels (no token required)
export const fetchHotelsAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Adjust according to your API's response structure
};

// Add a new hotel (token required)
// Add a new hotel (token required)
export const addHotelsAPI = async (hotelFormData) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  try {
    const response = await axios.post(API_URL, hotelFormData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Specify the content type for FormData
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding hotel:", error);
    throw error;
  }
};


// Get hotel by ID (open access)
export const getHotelByIdAPI = async (hotelId) => {
  const response = await axios.get(`${API_URL}/${hotelId}`);
  return response.data; // Adjust according to your API's response structure
};

// Update hotel (token required)
export const updateHotelAPI = async (hotelId, updatedHotel) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  const response = await axios.put(`${API_URL}/${hotelId}`, updatedHotel, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.data; // Adjust according to your API's response structure
};

// Delete hotel (token required)
export const deleteHotelAPI = async (hotelId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  await axios.delete(`${API_URL}/${hotelId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  // No return is needed; just handle confirmation if necessary
};
