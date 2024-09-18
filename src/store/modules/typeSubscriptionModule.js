// // src/store/modules/typeSubscriptionModule.js
// import axios from 'axios';
// import router from '@/router';

// const state = {
//   typeSubscriptions: [],
//   errorMessage: null,
// };
// // subscription
// const getters = {
//   allTypeSubscriptions: (state) => state.typeSubscriptions,
//   getTypeSubscriptionById: (state) => (id) => state.typeSubscriptions.find(typeSubscription => typeSubscription.id === id),
//   errorMessage: (state) => state.errorMessage,
// };

// const actions = {
//   async fetchTypeSubscriptions({ commit }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:8000/api/subscriptionTypes', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('setTypeSubscriptions', response.data);
//     } catch (error) {
//       commit('setErrorMessage', error.response.data.message || 'Failed to fetch typeSubscriptions');
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
//         console.error('Failed to fetch typeSubscriptions:', error);
//       }
//     }
//   },

//   async fetchTypeSubscriptionById({ commit }, id) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get(`http://localhost:8000/api/subscriptionTypes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       commit('setErrorMessage', error.response.data.message || 'Failed to fetch typeSubscription');
//       console.error('Failed to fetch typeSubscription:', error);
//       throw error;
//     }
//   },

//   async addTypeSubscription({ commit }, typeSubscription) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.post('http://localhost:8000/api/subscriptionTypes', typeSubscription, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('addTypeSubscription', response.data);
//     } catch (error) {
//       commit('setErrorMessage', error.response.data.message || 'Failed to add typeSubscription');
//       console.error('Failed to add typeSubscription:', error);
//     }
//   },

//   async updateTypeSubscription({ commit }, updatedTypeSubscription) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.put(`http://localhost:8000/api/subscriptionTypes/${updatedTypeSubscription.id}`, updatedTypeSubscription, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('updateTypeSubscription', response.data);
//     } catch (error) {
//       commit('setErrorMessage', error.response.data.message || 'Failed to update Type Ticket');
//       console.error('Failed to update Type Ticket:', error);
//     }
//   },
//   async deleteTypeSubscription({ commit }, typeSubscriptionId) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.delete(`http://localhost:8000/api/subscriptionTypes/${typeSubscriptionId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       commit('removeTypeSubscription', typeSubscriptionId);
//     } catch (error) {
//       commit('setErrorMessage', error.response.data.message || 'Failed to delete typeSubscription');
//       console.error('Failed to delete typeSubscription:', error);
//     }
//   },
// };

// const mutations = {
//   setTypeSubscriptions(state, typeSubscriptions) {
//     state.typeSubscriptions = typeSubscriptions;
//   },
//   addTypeSubscription(state, typeSubscription) {
//     state.typeSubscriptions.push(typeSubscription);
//   },
//   updateTypeSubscription(state, updatedTypeSubscription) {
//     const index = state.typeSubscriptions.findIndex((typeSubscription) => typeSubscription.id === updatedTypeSubscription.id);
//     if (index !== -1) {
//       state.typeSubscriptions.splice(index, 1, updatedTypeSubscription);
//     }
//   },
//   removeTypeSubscription(state, typeSubscriptionId) {
//     state.typeSubscriptions = state.typeSubscriptions.filter((typeSubscription) => typeSubscription.id !== typeSubscriptionId);
//   },
//   setErrorMessage(state, message) {
//     state.errorMessage = message;
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };

// src/store/modules/subscriptionTypesModule.js
import axios from 'axios';

const state = {
  subscriptionTypes: [],
  total: 0,
  perPage: 10,
  currentPage: 1
};

// const state = {
//   typeSubscriptions: [],
//   errorMessage: null,
// };
// // subscription
// const getters = {
//   allTypeSubscriptions: (state) => state.typeSubscriptions,
//   getTypeSubscriptionById: (state) => (id) => state.typeSubscriptions.find(typeSubscription => typeSubscription.id === id),
//   errorMessage: (state) => state.errorMessage,
// };
const getters = {
  allsubscriptionTypes: (state) => state.subscriptionTypes,
  // getsubscriptionTypeById: (state) => (id) => state.subscriptionTypes.find(subscriptionType => subscriptionType.id === id),
  // subscriptionTypeCount: state => state.subscriptionTypes.length,
  totalsubscriptionTypes: (state) => state.total,
  perPage: (state) => state.perPage,
  currentPage: (state) => state.currentPage
};

const actions = {
  async fetchsubscriptionTypes({ commit }, { page = 1, perPage = 10 } = {}) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.get('http://localhost:8000/api/subscriptionTypes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          perPage
        }
      });
      
      commit('SET_subscriptionTypeS', response.data.data);
      commit('SET_TOTAL', response.data.total);
      commit('SET_PER_PAGE', response.data.per_page);
      commit('SET_CURRENT_PAGE', page);
    } catch (error) {
      console.error('Error fetching subscriptionTypes:', error);
    }
  },

  async fetchsubscriptionTypeById({ commit }, id) {
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
    return response.data[0]; // Assurez-vous de retourner la bonne structure de données
  } catch (error) {
    console.error('Failed to fetch subscriptionType:', error);
    throw error;
  }
}
,
 async addsubscriptionType({ commit }, subscriptionType) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:8000/api/subscriptionTypes', subscriptionType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('addsubscriptionType', response.data);
    } catch (error) {
      console.error('Failed to add subscriptionType:', error);
      throw error;
    }
  },

 async deletesubscriptionType({ commit }, subscriptionTypeId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/subscriptionTypes/${subscriptionTypeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('removesubscriptionType', subscriptionTypeId);
        return 'subscriptionType supprimé avec succès'; // Message de succès
      } catch (error) {
        console.error('Error deleting subscriptionType:', error);
        throw new Error('Erreur lors de la suppression de l\'subscriptionType'); // Message d'erreur
      }
    },
    
  // modifier un subscriptionType 
  async updatesubscriptionType({ commit }, subscriptionType) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/api/subscriptionTypes/${subscriptionType.id}`, subscriptionType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('updatesubscriptionType', response.data);
    } catch (error) {
      console.error('Failed to update subscriptionType:', error);
      throw error;
    }
  },
  

  // Other actions (fetchsubscriptionTypeById, addsubscriptionType, updatesubscriptionType, deletesubscriptionType, activatesubscriptionType, deactivatesubscriptionType)
};

const mutations = {
  SET_subscriptionTypeS(state, subscriptionTypes) {
    state.subscriptionTypes = subscriptionTypes;
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
  addsubscriptionType(state, subscriptionType) {
    state.subscriptionTypes.push(subscriptionType);
  },
  updatesubscriptionType(state, updatesubscriptionType) {
    const index = state.subscriptionTypes.findIndex((subscriptionType) => subscriptionType.id === updatesubscriptionType.id);
    if (index !== -1) {
      state.subscriptionTypes.splice(index, 1, updatesubscriptionType);
    }
  },
  removesubscriptionType(state, subscriptionTypeId) {
    state.subscriptionTypes = state.subscriptionTypes.filter((subscriptionType) => subscriptionType.id !== subscriptionTypeId);
  },
  setsubscriptionTypeStatus(state, { subscriptionTypeId, status }) {
    const subscriptionType = state.subscriptionTypes.find(subscriptionType => subscriptionType.id === subscriptionTypeId);
    if (subscriptionType) {
      subscriptionType.status = status;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
