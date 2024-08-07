// store/modules/datesDeparts.js
import axios from 'axios';

const state = {
  dates: [],
  totalDates: 0,
  perPage: 5,
};

const getters = {
  allDates: (state) => state.dates,
  totalDates: (state) => state.totalDates,
  perPage: (state) => state.perPage,
};

const actions = {
//   async fetchDates({ commit }, { trajetId, page, perPage }) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       // const response = await axios.get(`http://localhost:8000/api/trajets/${trajetId}/dates`, {
//             const response = await axios.get(`/api/trajets/${trajetId}/dates`, {

//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: { page, perPage },
//       });

//       commit('setDates', response.data.data);
//       commit('setTotalDates', response.data.total);
//     } catch (error) {
//       console.error('Failed to fetch dates:', error);
//     }
//   },
async fetchDates({ commit }, { trajetId, page, perPage }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Ajouter un journal de la requête
    console.log(`Fetching dates for trajetId: ${trajetId}, page: ${page}, perPage: ${perPage}`);

    // Effectuer la requête Axios
    const response = await axios.get(`http://localhost:8000/api/trajets/${trajetId}/dates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, perPage },
    });

    // Ajouter un journal de la réponse
    console.log('API response:', response);

    // Mettre à jour l'état avec les données reçues
    commit('setDates', response.data.data);
    commit('setTotalDates', response.data.total);
  } catch (error) {
    // Ajouter un journal pour les erreurs
    console.error('Failed to fetch dates:', error);

    // Vérifier si l'erreur est une erreur Axios
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // L'erreur a été causée par une demande sans réponse
      console.error('Request data:', error.request);
    } else {
      // Une erreur a été déclenchée lors de la configuration de la demande
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
}

,
  async createDate({ dispatch }, { trajetId, dateData }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(`http://localhost:8000/api/trajets/dates`, dateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch('fetchDates', { trajetId, page: 1, perPage: state.perPage });
    } catch (error) {
      console.error('Failed to create date:', error);
    }
  },

  // async updateDate({ dispatch }, { trajetId, dateId, dateData }) {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }

  //     await axios.put(`http://localhost:8000/api/trajets/${trajetId}/dates/${dateId}`, dateData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     dispatch('fetchDates', { trajetId, page: 1, perPage: state.perPage });
  //   } catch (error) {
  //     console.error('Failed to update date:', error);
  //   }
  // },
async updateDate({ dispatch }, { trajetId, dateId, dateData }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    await axios.put(`http://localhost:8000/api/trajets/${trajetId}/dates/${dateId}`, dateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch('fetchDates', { trajetId, page: 1, perPage: state.perPage });
  } catch (error) {
    console.error('Failed to update date:', error);
  }
},

// 
async fetchDateDetails({ commit }, { trajetId, dateId }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:8000/api/trajets/${trajetId}/dates/${dateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        commit('setDateData', response.data);
        return response.data;
    } catch (error) {
      console.error('Failed to fetch date details:', error);
    }
  },
// 
  async deleteDate({ dispatch }, { trajetId, dateId }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/trajets/${trajetId}/dates/${dateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch('fetchDates', { trajetId, page: 1, perPage: state.perPage });
    } catch (error) {
      console.error('Failed to delete date:', error);
    }
  },
  async ajouterDateDepart({ commit }, { trajetId, dateDepart }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(
      `http://localhost:8000/api/trajets/${trajetId}/dates`,
      { dateDepart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    commit('addDate', response.data);
    // Gérer la réponse si nécessaire
    // return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la date de départ:', error);
    throw error; // Relancer l'erreur pour que le composant puisse la gérer
  }
}

};

const mutations = {
  setDates(state, dates) {
    state.dates = dates;
  },
  setTotalDates(state, total) {
    state.totalDates = total;
  },
  setDateDetails(state, dateDetails) {
    state.dateData = dateDetails; // Update the state with fetched date details
  },
   addDate(state, dateDepart) {
    state.dates.push(dateDepart);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
