// src/store/modules/subscriptionsModule.js
import axios from 'axios';
import router from '@/router';

const state = {
   subscriptions: [],
   errorMessage: null,
  // 
  //  totalsubscriptions: 0,
   subscriptionsByType: [],
   totalRevenueByType: [],
  
  
};

const getters = {
  allSubscriptions: (state) => state.subscriptions,
  errorMessage: (state) => state.errorMessage,
  subscriptionCount: state => state.subscriptions.length, // Compter les subscriptions
  // 
  subscriptionsByType: (state) => state.subscriptionsByType,
  totalRevenueByType: (state) => state.totalRevenueByType,
};


const actions = {
  async fetchSubscriptions({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/subscriptions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setSubscription', response.data);
    } catch (error) {
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
        console.error('Failed to fetch subscriptions:', error);
      }
    }
  },

  async deleteSubscription({ commit }, subscriptionId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/subscriptions/${subscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('removeSubscription', subscriptionId);
    } catch (error) {
      console.error('Failed to delete subscription:', error);
      throw error;
    }
  },
// 
  async fetchSubscriptionsByType({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/subscriptions/by-type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setSubscriptionsByType', response.data);
    } catch (error) {
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
        console.error('Failed to fetch subscriptions:', error);
      }
    }
  },
  async fetchTotalRevenueByType({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/subscriptions/revenue-by-type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTotalRevenueByType', response.data);
    } catch (error) {
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
        console.error('Failed to fetch subscriptions:', error);
      }
    }
  },
}

const mutations = {
  setSubscription(state, subscriptions) {
    state.subscriptions = subscriptions;
  },
   removeSubscription(state, subscriptionId) {
    state.subscriptions = state.subscriptions.filter((subscription) => subscription.id !== subscriptionId);
  },
  setErrorMessage(state, message) {
    state.errorMessage = message;
  },
  setSubscriptionsByType(state, subscriptionsByType) {
    state.subscriptionsByType = subscriptionsByType;
  },
   setTotalRevenueByType(state, totalRevenueByType) {
    state.totalRevenueByType = totalRevenueByType;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
