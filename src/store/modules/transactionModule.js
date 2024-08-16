
// // src/store/modules/TransactionsModule.js
// import axios from 'axios';
// import router from '@/router';

// const state = {
//   transactions: [],
//   transactionsByType: [],
//   totalTransactionsByType: [],
//   totalTransactions: 0,
//   totalAmount: 0,
//   dailyRevenues: [],
//   errorMessage: null,
// };

// const getters = {
//   allTransactions: (state) => state.transactions,
//   errorMessage: (state) => state.errorMessage,
//   transactionCount: (state) => state.transactions.length,
  
//   transactionsByType: (state) => state.transactionsByType,
//   totalTransactionsByType: (state) => state.totalTransactionsByType,
//   totalTransactions: (state) => state.totalTransactions,
//   totalAmount: (state) => state.totalAmount,

//   dailyRevenues: (state) => state.dailyRevenues, // Add this getter

// };

// const actions = {
//   async fetchTransactions({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/transactions', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//             console.log('API Response:', response.data); // Vérifiez la structure des données ici

//       commit('setTransactions', response.data);
//     } catch (error) {
//       handleError(error);
//     }
//   },

//   async deleteTransaction({ commit }, transactionId) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.delete(`http://localhost:8000/api/transactions/${transactionId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('removeTransaction', transactionId);
//     } catch (error) {
//       handleError(error);
//     }
//   },
//   async fetchTransactionSummary({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/transactions/summary', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTransactionSummary', response.data);
//     } catch (error) {
//       handleError(error);
//     }
//   },

//   async fetchTransactionsByType({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/transactions/by-type', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTransactionsByType', response.data);
//     } catch (error) {
//       handleError(error);
//     }
//   },

//   async fetchTotalTransactionsByType({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/transactions/total-by-type', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTotalTransactionsByType', response.data);
//     } catch (error) {
//       handleError(error);
//     }
//   },

// // revenu/jour
// async fetchDailyRevenues({ commit }) {
//   try {
//      const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }
//     const response = await axios.get('http://localhost:8000/api/transactions/revenues-daily', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     commit("SET_DAILY_REVENUES", response.data);
//   } catch (error) {
//     console.error("An error occurred while fetching daily revenues:", error);
//   }
// }


// };

// const mutations = {
//   setTransactions(state, transactions) {
//     state.transactions = transactions;
//   },
//   removeTransaction(state, transactionId) {
//     state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
//   },
//   setErrorMessage(state, message) {
//     state.errorMessage = message;
//   },
//   setTransactionSummary(state, summary) {
//     state.totalTransactions = summary.total_transactions;
//     state.totalAmount = summary.total_amount;
//   },
//   setTransactionsByType(state, transactionsByType) {
//     state.transactionsByType = transactionsByType;
//   },
//   setTotalTransactionsByType(state, totalTransactionsByType) {
//     state.totalTransactionsByType = totalTransactionsByType;
//   },
//   SET_DAILY_REVENUES(state, revenues) { // Add this mutation
//       state.dailyRevenues = revenues;
//   },
  
// };

// function handleError(error) {
//   if (error.response) {
//     if (error.response.status === 403) {
//       console.error('Forbidden: You do not have the right permissions to access this resource.');
//     } else if (error.response.status === 401) {
//       console.error('Unauthorized: Invalid or expired token.');
//       router.push({ name: 'login' });
//     } else {
//       console.error(`Error ${error.response.status}: ${error.response.data.message}`);
//     }
//   } else {
//     console.error('Failed to fetch data:', error);
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };

// src/store/modules/transactionsModule.js
import axios from 'axios';

const state = {
  transactions: [],
  total: 0,
  perPage: 10,
  currentPage: 1,

  transactionsByType: [],
  totalTransactionsByType: [],
  totalTransactions: 0,
  totalAmount: 0,
  dailyRevenues: [],
  errorMessage: null,
};

const getters = {
  alltransactions: (state) => state.transactions,
  gettransactionById: (state) => (id) => state.transactions.find(transaction => transaction.id === id),
  transactionCount: state => state.transactions.length,
  totaltransactions: (state) => state.total,
  perPage: (state) => state.perPage,
  currentPage: (state) => state.currentPage,

  //
   transactionsByType: (state) => state.transactionsByType,
  totalTransactionsByType: (state) => state.totalTransactionsByType,
  totalTransactions: (state) => state.totalTransactions,
  totalAmount: (state) => state.totalAmount,

  dailyRevenues: (state) => state.dailyRevenues, // Add this getter


};

const actions = {
  async fetchtransactions({ commit }, { page = 1, perPage = 10 } = {}) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          perPage
        }
      });
      
      commit('SET_transactionS', response.data.data);
      commit('SET_TOTAL', response.data.total);
      commit('SET_PER_PAGE', response.data.per_page);
      commit('SET_CURRENT_PAGE', page);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  },

  async fetchtransactionById({ commit }, id) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`http://localhost:8000/api/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    // return response.data[0]; // Assurez-vous de retourner la bonne structure de données
  } catch (error) {
    console.error('Failed to fetch transaction:', error);
    throw error;
  }
}
,
 async deletetransaction({ commit }, transactionId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/transactions/${transactionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('removetransaction', transactionId);
        return 'transaction supprimé avec succès'; // Message de succès
      } catch (error) {
        console.error('Error deleting transaction:', error);
        throw new Error('Erreur lors de la suppression de l\'transaction'); // Message d'erreur
      }
    },

    // 
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

// revenu/jour
async fetchDailyRevenues({ commit }) {
  try {
     const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
    const response = await axios.get('http://localhost:8000/api/transactions/revenues-daily', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    commit("SET_DAILY_REVENUES", response.data);
  } catch (error) {
    console.error("An error occurred while fetching daily revenues:", error);
  }
    
  }
};

  // Other actions (fetchtransactionById, addtransaction, updatetransaction, deletetransaction, activatetransaction, deactivatetransaction)


const mutations = {
  SET_transactionS(state, transactions) {
    state.transactions = transactions;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },

  removetransaction(state, transactionId) {
    state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
  },
  settransactionStatus(state, { transactionId, status }) {
    const transaction = state.transactions.find(transaction => transaction.id === transactionId);
    if (transaction) {
      transaction.status = status;
    }
  },
  //
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
  SET_DAILY_REVENUES(state, revenues) { // Add this mutation
      state.dailyRevenues = revenues;
  },
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
