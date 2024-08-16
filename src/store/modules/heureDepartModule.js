// store/modules/heuresDeparts.js
import axios from 'axios';

const state = {
  heures: [],
  totalheures: 0,
  perPage: 5,
};

const getters = {
  allheures: (state) => state.heures,
  totalheures: (state) => state.totalheures,
  perPage: (state) => state.perPage,
};

const actions = {

async fetchheures({ commit }, { trajetId, page, perPage }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Ajouter un journal de la requête
    console.log(`Fetching heures for trajetId: ${trajetId}, page: ${page}, perPage: ${perPage}`);

    // Effectuer la requête Axios
    const response = await axios.get(`http://localhost:8000/api/trajets/${trajetId}/heures`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, perPage },
    });

    // Ajouter un journal de la réponse
    console.log('API response:', response);

    // Mettre à jour l'état avec les données reçues
    commit('setheures', response.data.data);
    commit('setTotalheures', response.data.total);
  } catch (error) {
    // Ajouter un journal pour les erreurs
    console.error('Failed to fetch heures:', error);

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
  async createheure({ dispatch }, { trajetId, heureData }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(`http://localhost:8000/api/trajets/heures`, heureData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch('fetchheures', { trajetId, page: 1, perPage: state.perPage });
    } catch (error) {
      console.error('Failed to create heure:', error);
    }
  },

async upheureheure({ dispatch }, { trajetId, heureId, heureData }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    await axios.put(`http://localhost:8000/api/trajets/${trajetId}/heures/${heureId}`, heureData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch('fetchheures', { trajetId, page: 1, perPage: state.perPage });
  } catch (error) {
    console.error('Failed to upheure heure:', error);
  }
},

// 
async fetchheureDetails({ commit }, { trajetId, heureId }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:8000/api/trajets/${trajetId}/heures/${heureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        commit('setheureData', response.data);
        return response.data;
    } catch (error) {
      console.error('Failed to fetch heure details:', error);
    }
  },
// 
  async deleteheure({ dispatch }, { trajetId, heureId }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/trajets/${trajetId}/heures/${heureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch('fetchheures', { trajetId, page: 1, perPage: state.perPage });
    } catch (error) {
      console.error('Failed to delete heure:', error);
    }
  },
  async ajouterheureDepart({ commit }, { trajetId, heureDepart }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(
      `http://localhost:8000/api/trajets/${trajetId}/heures`,
      { heureDepart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    commit('addheure', response.data);
    // Gérer la réponse si nécessaire
    // return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la heure de départ:', error);
    throw error; // Relancer l'erreur pour que le composant puisse la gérer
  }
}

};

const mutations = {
  setheures(state, heures) {
    state.heures = heures;
  },
  setTotalheures(state, total) {
    state.totalheures = total;
  },
  setheureDetails(state, heureDetails) {
    state.heureData = heureDetails; // Upheure the state with fetched heure details
  },
   addheure(state, heureDepart) {
    state.heures.push(heureDepart);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
