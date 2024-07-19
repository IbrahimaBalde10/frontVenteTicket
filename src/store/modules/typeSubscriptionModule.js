// src/store/modules/typeSubscriptionModule.js
import axios from 'axios';
import router from '@/router';

const state = {
  typeSubscriptions: [],
  errorMessage: null,
};
// subscription
const getters = {
  allTypeSubscriptions: (state) => state.typeSubscriptions,
  getTypeSubscriptionById: (state) => (id) => state.typeSubscriptions.find(typeSubscription => typeSubscription.id === id),
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  async fetchTypeSubscriptions({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/subscriptionTypes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTypeSubscriptions', response.data);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to fetch typeSubscriptions');
      if (error.response) {
        if (error.response.status === 403) {
          console.error('Forbidden: You do not have the right permissions to access this resource.');
        } else if (error.response.status === 401) {
          console.error('Unauthorized: Invalid or expired token.');
          router.push({ name: 'login' });
        } else {
          console.error(`Error ${error.response.status}: ${error.response.data.message}`);
        }
      } else {
        console.error('Failed to fetch typeSubscriptions:', error);
      }
    }
  },

  async fetchTypeSubscriptionById({ commit }, id) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:8000/api/subscriptionTypes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to fetch typeSubscription');
      console.error('Failed to fetch typeSubscription:', error);
      throw error;
    }
  },

  async addTypeSubscription({ commit }, typeSubscription) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:8000/api/subscriptionTypes', typeSubscription, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('addTypeSubscription', response.data);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to add typeSubscription');
      console.error('Failed to add typeSubscription:', error);
    }
  },

  async updateTypeSubscription({ commit }, updatedTypeSubscription) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/api/subscriptionTypes/${updatedTypeSubscription.id}`, updatedTypeSubscription, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('updateTypeSubscription', response.data);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to update Type Ticket');
      console.error('Failed to update Type Ticket:', error);
    }
  },
  async deleteTypeSubscription({ commit }, typeSubscriptionId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/subscriptionTypes/${typeSubscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('removeTypeSubscription', typeSubscriptionId);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to delete typeSubscription');
      console.error('Failed to delete typeSubscription:', error);
    }
  },
};

const mutations = {
  setTypeSubscriptions(state, typeSubscriptions) {
    state.typeSubscriptions = typeSubscriptions;
  },
  addTypeSubscription(state, typeSubscription) {
    state.typeSubscriptions.push(typeSubscription);
  },
  updateTypeSubscription(state, updatedTypeSubscription) {
    const index = state.typeSubscriptions.findIndex((typeSubscription) => typeSubscription.id === updatedTypeSubscription.id);
    if (index !== -1) {
      state.typeSubscriptions.splice(index, 1, updatedTypeSubscription);
    }
  },
  removeTypeSubscription(state, typeSubscriptionId) {
    state.typeSubscriptions = state.typeSubscriptions.filter((typeSubscription) => typeSubscription.id !== typeSubscriptionId);
  },
  setErrorMessage(state, message) {
    state.errorMessage = message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
