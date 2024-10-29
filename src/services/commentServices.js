import axios from 'axios';

const API_URL = 'http://localhost:3000/comment'; // Update with your actual API endpoint

// Fetch comments (no token required)
export const fetchCommentsAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Adjust according to your API's response structure
};

// Add a new comment (no token required)
export const addCommentsAPI = async (commentFormData) => {
  try {
    const response = await axios.post(API_URL, commentFormData, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type for JSON data
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Get comment by ID (no token required)
export const getCommentByIdAPI = async (commentId) => {
  const response = await axios.get(`${API_URL}/${commentId}`);
  return response.data; // Adjust according to your API's response structure
};

// Update comment (no token required)
export const updateCommentAPI = async (id, updatedComment) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedComment, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type for JSON data
      },
    });
    return response.data; // Adjust according to your API's response structure
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// Delete comment (token required)
export const deleteCommentAPI = async (commentId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  await axios.delete(`${API_URL}/${commentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  // No return is needed; just handle confirmation if necessary
};
