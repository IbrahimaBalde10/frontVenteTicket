// src/store/modules/ticketsModule.js
import axios from 'axios';
import router from '@/router';

// const state = {
//   tickets: [],
//   errorMessage: null,
//   // 
// };
const state = {
   tickets: [],
   errorMessage: null,
  // 
  //  totalTickets: 0,
   ticketsByType: [],
   totalRevenueByType: [],
  
  
};

const getters = {
  allTickets: (state) => state.tickets,
  errorMessage: (state) => state.errorMessage,
  ticketCount: state => state.tickets.length, // Compter les tickets
  // 
  ticketsByType: (state) => state.ticketsByType,
  totalRevenueByType: (state) => state.totalRevenueByType,
};


const actions = {
  async fetchTickets({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTickets', response.data);
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
        console.error('Failed to fetch tickets:', error);
      }
    }
  },

  async deleteTicket({ commit }, ticketId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('removeTicket', ticketId);
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      throw error;
    }
  },
// 
  async fetchTicketsByType({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/tickets/by-type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTicketsByType', response.data);
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
        console.error('Failed to fetch tickets:', error);
      }
    }
  },
  async fetchTotalRevenueByType({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/tickets/revenue-by-type', {
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
        console.error('Failed to fetch tickets:', error);
      }
    }
  },
}

const mutations = {
  setTickets(state, tickets) {
    state.tickets = tickets;
  },
   removeTicket(state, ticketId) {
    state.tickets = state.tickets.filter((ticket) => ticket.id !== ticketId);
  },
  setErrorMessage(state, message) {
    state.errorMessage = message;
  },
  setTicketsByType(state, ticketsByType) {
    state.ticketsByType = ticketsByType;
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
