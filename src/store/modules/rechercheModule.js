// store/modules/rechercheModule.js
import axios from 'axios';

const state = () => ({
  searchResults: {
    tickets: [],
    users: [],
    trajets: [],
    subscription_types: [],
    subscriptions: [],
    transactions: [],
  },
  searchTerm: ''
});

const mutations = {
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results;
  },
  SET_SEARCH_TERM(state, term) {
    state.searchTerm = term;
  }
};

const actions = {
  async search({ commit }, query) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Effectuer la recherche via l'API
      const response = await axios.get('http://localhost:8000/api/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          query 
        },
      });

      console.log('Search results:', response.data);  // Vérifier la réponse de l'API
      commit('SET_SEARCH_TERM', query);
      commit('SET_SEARCH_RESULTS', response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }
};

const getters = {
  searchResults: state => state.searchResults,
  searchTerm: state => state.searchTerm
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
