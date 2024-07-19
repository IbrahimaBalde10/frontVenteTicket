import { createStore } from "vuex";
import router from "../router/index.js";
import axios from "../axios.js";

import users from './modules/userModule.js'; // Importer le module des utilisateurs
import typeTickets from './modules/typeTicketModule.js'; // Importer le module des utilisateurs
import typeSubscriptions from './modules/typeSubscriptionModule.js'; // Importer le module des utilisateurs
import transactions from './modules/transactionModule.js';
import tickets from './modules/ticketModule.js';
import subscriptions from './modules/subscriptionModule.js';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },

  mutations: {
    LOGIN(state, userData) {
      state.isLoggedIn = true;
      state.user = userData.user;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          credentials
        );
        const userData = response.data;
        commit("LOGIN", userData);
      } catch (error) {
        console.error("An error occurred during login:", error);
        throw error; // Optional: rethrow the error if you want to handle it in the component
      }
    },

    async register({ commit }, userData) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register",
          userData
        );
        const user = response.data;
        commit("LOGIN", user);
      } catch (error) {
        console.error("An error occurred during registration:", error);
        throw error; // Optional: rethrow the error if you want to handle it in the component
      }
    },

    async logout({ commit }) {
      try {
        // Assurez-vous d'envoyer le token d'authentification
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }

        // Déconnexion côté serveur en envoyant le token
        await axios.post("http://localhost:8000/api/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Réinitialisation de l'état local et redirection vers la page de connexion
        commit("LOGOUT");
        router.push({ name: "login" });
      } catch (error) {
        console.error("An error occurred during logout:", error);
        throw error; // Optionnel : rejet de l'erreur pour la gestion dans le composant
      }
    },

    navigateToLogin() {
      router.push({ name: "login" });
    },
  },

  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getUser: (state) => state.user,
  },

  modules: {
    users, // Ajouter le module des utilisateurs
    typeTickets,
    typeSubscriptions,
    transactions,
    tickets,
    subscriptions,
  },
});
