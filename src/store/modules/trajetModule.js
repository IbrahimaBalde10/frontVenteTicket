// src/store/modules/trajetsModule.js
import axios from 'axios';

const state = {
  trajets: [],
  total: 0,
  perPage: 10,
  currentPage: 1
};

const getters = {
  allTrajets: (state) => state.trajets,
  getTrajetById: (state) => (id) => state.trajets.find(trajet => trajet.id === id),
  trajetCount: state => state.trajets.length,
  totalTrajets: (state) => state.total,
  perPage: (state) => state.perPage,
  currentPage: (state) => state.currentPage
};

const actions = {
  async fetchTrajets({ commit }, { page = 1, perPage = 10 } = {}) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.get('http://localhost:8000/api/trajets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          perPage
        }
      });
      
      commit('SET_TRAJETS', response.data.data);
      commit('SET_TOTAL', response.data.total);
      commit('SET_PER_PAGE', response.data.per_page);
      commit('SET_CURRENT_PAGE', page);
    } catch (error) {
      console.error('Error fetching trajets:', error);
    }
  },

  async fetchTrajetById({ commit }, id) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`http://localhost:8000/api/trajets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data[0]; // Assurez-vous de retourner la bonne structure de données
  } catch (error) {
    console.error('Failed to fetch trajet:', error);
    throw error;
  }
}
,
 async addTrajet({ commit }, trajet) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:8000/api/trajets', trajet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('addTrajet', response.data);
    } catch (error) {
      console.error('Failed to add trajet:', error);
      throw error;
    }
  },

 async deleteTrajet({ commit }, trajetId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/trajets/${trajetId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('removeTrajet', trajetId);
        return 'trajet supprimé avec succès'; // Message de succès
      } catch (error) {
        console.error('Error deleting trajet:', error);
        throw new Error('Erreur lors de la suppression de l\'trajet'); // Message d'erreur
      }
    },
    
  // modifier un trajet 
  async updateTrajet({ commit }, trajet) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/api/trajets/${trajet.id}`, trajet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('updateTrajet', response.data);
    } catch (error) {
      console.error('Failed to update trajet:', error);
      throw error;
    }
  },
  

  // Other actions (fetchTrajetById, addTrajet, updateTrajet, deleteTrajet, activateTrajet, deactivateTrajet)
};

const mutations = {
  SET_TRAJETS(state, trajets) {
    state.trajets = trajets;
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
  addTrajet(state, trajet) {
    state.trajets.push(trajet);
  },
  updateTrajet(state, updateTrajet) {
    const index = state.trajets.findIndex((trajet) => trajet.id === updateTrajet.id);
    if (index !== -1) {
      state.trajets.splice(index, 1, updateTrajet);
    }
  },
  removeTrajet(state, trajetId) {
    state.trajets = state.trajets.filter((trajet) => trajet.id !== trajetId);
  },
  setTrajetStatus(state, { trajetId, status }) {
    const trajet = state.trajets.find(trajet => trajet.id === trajetId);
    if (trajet) {
      trajet.status = status;
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
