// src/store/modules/TransactionsModule.js
import axios from 'axios';
import router from '@/router';

const state = {
  transactions: [],
  transactionsByType: [],
  totalTransactionsByType: [],
  totalTransactions: 0,
  totalAmount: 0,
  errorMessage: null,
};

const getters = {
  allTransactions: (state) => state.transactions,
  errorMessage: (state) => state.errorMessage,
  transactionCount: (state) => state.transactions.length,
  transactionsByType: (state) => state.transactionsByType,
  totalTransactionsByType: (state) => state.totalTransactionsByType,
  totalTransactions: (state) => state.totalTransactions,
  totalAmount: (state) => state.totalAmount,
};

const actions = {
  async fetchTransactions({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTransactions', response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async deleteTransaction({ commit }, transactionId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('removeTransaction', transactionId);
    } catch (error) {
      handleError(error);
    }
  },
  async fetchTransactionSummary({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/transactions/summary', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTransactionSummary', response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async fetchTransactionsByType({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/transactions/by-type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTransactionsByType', response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async fetchTotalTransactionsByType({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/transactions/total-by-type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTotalTransactionsByType', response.data);
    } catch (error) {
      handleError(error);
    }
  },
};

const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions;
  },
  removeTransaction(state, transactionId) {
    state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
  },
  setErrorMessage(state, message) {
    state.errorMessage = message;
  },
  setTransactionSummary(state, summary) {
    state.totalTransactions = summary.total_transactions;
    state.totalAmount = summary.total_amount;
  },
  setTransactionsByType(state, transactionsByType) {
    state.transactionsByType = transactionsByType;
  },
  setTotalTransactionsByType(state, totalTransactionsByType) {
    state.totalTransactionsByType = totalTransactionsByType;
  },
};

function handleError(error) {
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
    console.error('Failed to fetch data:', error);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
