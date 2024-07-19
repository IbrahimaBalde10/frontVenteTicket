// src/store/modules/TypeTicketModule.js
import axios from 'axios';
import router from '@/router';

const state = {
  typeTickets: [],
  errorMessage: null,
};

const getters = {
  alltypeTickets: (state) => state.typeTickets,
  getTypeTicketById: (state) => (id) => state.typeTickets.find(typeTicket => typeTicket.id === id),
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  async fetchTypeTickets({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/ticketTypes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('settypeTickets', response.data);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to fetch typeTickets');
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
        console.error('Failed to fetch typeTickets:', error);
      }
    }
  },

  async fetchTypeTicketById({ commit }, id) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:8000/api/ticketTypes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to fetch TypeTicket');
      console.error('Failed to fetch TypeTicket:', error);
      throw error;
    }
  },

  async addTypeTicket({ commit }, typeTicket) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:8000/api/ticketTypes', typeTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('addtypeTicket', response.data);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to add TypeTicket');
      console.error('Failed to add TypeTicket:', error);
    }
  },

  async updateTypeTicket({ commit }, updatedTypeTicket) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/api/ticketTypes/${updatedTypeTicket.id}`, updatedTypeTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('updatetypeTicket', response.data);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to update Type Ticket');
      console.error('Failed to update Type Ticket:', error);
    }
  },
  async deletetypeTicket({ commit }, typeTicketId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/ticketTypes/${typeTicketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('removetypeTicket', typeTicketId);
    } catch (error) {
      commit('setErrorMessage', error.response.data.message || 'Failed to delete TypeTicket');
      console.error('Failed to delete TypeTicket:', error);
    }
  },
};

const mutations = {
  settypeTickets(state, typeTickets) {
    state.typeTickets = typeTickets;
  },
  addtypeTicket(state, typeTicket) {
    state.typeTickets.push(typeTicket);
  },
  updatetypeTicket(state, updatedtypeTicket) {
    const index = state.typeTickets.findIndex((typeTicket) => typeTicket.id === updatedtypeTicket.id);
    if (index !== -1) {
      state.typeTickets.splice(index, 1, updatedtypeTicket);
    }
  },
  removetypeTicket(state, typeTicketId) {
    state.typeTickets = state.typeTickets.filter((typeTicket) => typeTicket.id !== typeTicketId);
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
