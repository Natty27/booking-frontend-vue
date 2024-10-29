// src/store/comment.js

import { fetchCommentsAPI, addCommentsAPI, getCommentByIdAPI, deleteCommentAPI, updateCommentAPI } from '../services/commentServices';

const state = {
  comments: [],
  selectedComment: {},
  loading: false,
  error: null,
};

const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
  setSelectedComment(state, selectedComment) {
    state.selectedComment = selectedComment;
  },
  addComment(state, comment) { // Change from addComments to addComment
    state.comments.push(comment); // Add a single comment
  },
  removeComment(state, commentId) {
    state.comments = state.comments.filter(comment => comment.id !== commentId);
  },
  updateComment(state, updatedComment) {
    const index = state.comments.findIndex(comment => comment.id === updatedComment.id);
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment); // Update the comment in the array
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
  async fetchComments({ commit }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const comments = await fetchCommentsAPI();
      console.log(comments);
      commit('setComments', comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addComment({ commit }, comment) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const newComment = await addCommentsAPI(comment); // Ensure the API returns the created comment
      commit('addComment', newComment); // Use the returned newComment from the API
      return newComment; // Return the newly created comment
    } catch (error) {
      console.error('Error adding comment:', error);
      commit('setError', error);
      throw error; // Optionally throw the error to handle it in the calling component
    } finally {
      commit('setLoading', false);
    }
  },
  
  async getCommentById({ commit }, id) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const comment = await getCommentByIdAPI(id); // Ensure to use the correct API function
      commit('setSelectedComment', comment);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async deleteComment({ commit }, commentId) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      await deleteCommentAPI(commentId);
      commit('removeComment', commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async updateComment({ commit }, { id, updatedComment }) { // Accepting id and updatedComment
    commit('setLoading', true);
    commit('setError', null);
    try {
      await updateCommentAPI(id, updatedComment); // Call the API to update the comment with id
      commit('updateComment', updatedComment); // Commit the mutation to update the comment in the state
    } catch (error) {
      console.error('Error updating comment:', error);
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  
};

const getters = {
  getComments(state) {
    return state.comments;
  },
  getCommentById(state) {
    return state.selectedComment;
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
