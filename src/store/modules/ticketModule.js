// // src/store/modules/ticketsModule.js
// import axios from 'axios';
// import router from '@/router';

// // const state = {
// //   tickets: [],
// //   errorMessage: null,
// //   // 
// // };
// const state = {
//    tickets: [],
//    errorMessage: null,
//   // 
//   //  totalTickets: 0,
//    ticketsByType: [],
//    totalRevenueByType: [],
//   //  
//   total: 0,
//   perPage: 10,
//   currentPage: 1
  
  
// };

// const getters = {
//   allTickets: (state) => state.tickets,
//   errorMessage: (state) => state.errorMessage,
//   ticketCount: state => state.tickets.length, // Compter les tickets
//   // 
//   ticketsByType: (state) => state.ticketsByType,
//   totalRevenueByType: (state) => state.totalRevenueByType,
//   // 
//    totalTickets: (state) => state.total,
//   perPage: (state) => state.perPage,
//   currentPage: (state) => state.currentPage
// };


// const actions = {
//   async fetchTickets({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/tickets', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTickets', response.data);
//       // 
//       commit('SET_TOTAL', response.data.total);
//       commit('SET_PER_PAGE', response.data.per_page);
//       commit('SET_CURRENT_PAGE', page);
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 403) {
//           console.error('Forbidden: You do not have the right permissions to access this resource.');
//         } else if (error.response.status === 401) {
//           console.error('Unauthorized: Invalid or expired token.');
//           router.push({ name: 'login' });
//         } else {
//           console.error(`Error ${error.response.status}: ${error.response.data.message}`);
//         }
//       } else {
//         console.error('Failed to fetch tickets:', error);
//       }
//     }
//   },

//   async fetchticketById({ commit }, id) {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found');
//     }

//     const response = await axios.get(`http://localhost:8000/api/tickets/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch ticket:', error);
//     throw error;
//   }
// },
//   async deleteTicket({ commit }, ticketId) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.delete(`http://localhost:8000/api/tickets/${ticketId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('removeTicket', ticketId);
//     } catch (error) {
//       console.error('Failed to delete ticket:', error);
//       throw error;
//     }
//   },
// // 
//   async fetchTicketsByType({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/tickets/by-type', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTicketsByType', response.data);
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 403) {
//           console.error('Forbidden: You do not have the right permissions to access this resource.');
//         } else if (error.response.status === 401) {
//           console.error('Unauthorized: Invalid or expired token.');
//           router.push({ name: 'login' });
//         } else {
//           console.error(`Error ${error.response.status}: ${error.response.data.message}`);
//         }
//       } else {
//         console.error('Failed to fetch tickets:', error);
//       }
//     }
//   },
//   async fetchTotalRevenueByType({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/tickets/revenue-by-type', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTotalRevenueByType', response.data);
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 403) {
//           console.error('Forbidden: You do not have the right permissions to access this resource.');
//         } else if (error.response.status === 401) {
//           console.error('Unauthorized: Invalid or expired token.');
//           router.push({ name: 'login' });
//         } else {
//           console.error(`Error ${error.response.status}: ${error.response.data.message}`);
//         }
//       } else {
//         console.error('Failed to fetch tickets:', error);
//       }
//     }
//   },
// }

// const mutations = {
//   setTickets(state, tickets) {
//     state.tickets = tickets;
//   },
//   // 
//    SET_TOTAL(state, total) {
//     state.total = total;
//   },
//   SET_PER_PAGE(state, perPage) {
//     state.perPage = perPage;
//   },
//   SET_CURRENT_PAGE(state, page) {
//     state.currentPage = page;
//   },
//   // 
//    removeTicket(state, ticketId) {
//     state.tickets = state.tickets.filter((ticket) => ticket.id !== ticketId);
//   },
//   setErrorMessage(state, message) {
//     state.errorMessage = message;
//   },
//   setTicketsByType(state, ticketsByType) {
//     state.ticketsByType = ticketsByType;
//   },
//    setTotalRevenueByType(state, totalRevenueByType) {
//     state.totalRevenueByType = totalRevenueByType;
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };
// src/store/modules/ticketsModule.js
import axios from 'axios';
import router from '@/router';

const state = {
  tickets: [],
  errorMessage: null,
  ticketsByType: [],
  totalRevenueByType: [],
  total: 0,
  perPage: 10,
  currentPage: 1,
};

const getters = {
  allTickets: (state) => state.tickets,
    // ticket: (state) => state.ticket,

  errorMessage: (state) => state.errorMessage,
  ticketsByType: (state) => state.ticketsByType,
  totalRevenueByType: (state) => state.totalRevenueByType,
  totalTickets: (state) => state.total,
  perPage: (state) => state.perPage,
  currentPage: (state) => state.currentPage,
};

const actions = {
  async fetchTickets({ commit, state }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: state.currentPage,
          per_page: state.perPage,
        },
      });

      commit('setTickets', response.data.data);
      commit('SET_TOTAL', response.data.total);
      commit('SET_PER_PAGE', response.data.per_page);
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

  async deleteTicket({ commit, dispatch }, ticketId) {
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
      dispatch('fetchTickets'); // Re-fetch tickets after deletion
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      throw error;
    }
  },
  
  // async fetchticketById({ commit }, id) {
  // try {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     throw new Error('No token found');
  //   }

  //   const response = await axios.get(`http://localhost:8000/api/tickets/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //         commit('SET_TICKET', response.data);

  //   return response.data;
  // } catch (error) {
  //   console.error('Failed to fetch ticket:', error);
  //   throw error;
  // }
// },
async fetchTicketById({ commit }, id) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`http://localhost:8000/api/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Ticket details fetched successfully:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ticket:', error);
    throw error;
  }
}


};

const mutations = {
  setTickets(state, tickets) {
    state.tickets = tickets;
  },
  SET_TICKET(state, ticket) {
    state.ticket = ticket;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage;
  },
  removeTicket(state, ticketId) {
    state.tickets = state.tickets.filter((ticket) => ticket.id !== ticketId);
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
