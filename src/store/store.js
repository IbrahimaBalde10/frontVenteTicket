import { createStore } from "vuex";
import router from "../router/index.js";
import axios from "../axios.js";

import users from './modules/userModule.js';
// import typeTickets from './modules/typeTicketModule.js';
import typeSubscriptions from './modules/typeSubscriptionModule.js';
import transactions from './modules/transactionModule.js';
import tickets from './modules/ticketModule.js';
import subscriptions from './modules/subscriptionModule.js';
import trajets from './modules/trajetModule.js';
import datesDeparts from './modules/datesDepartModule'; // Importer le nouveau module


export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loginError: null, // Add this line
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
    SET_LOGIN_ERROR(state, errorMessage) { // Add this mutation
      state.loginError = errorMessage;
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
        
        if (userData.user.role !== 'Admin' && userData.user.role !== 'Comptable') {
          commit("SET_LOGIN_ERROR", "Accès non autorisé. Vous devez être admin ou comptable.");
          throw new Error("Unauthorized access");
        }
         if (userData.user.status !== 'active') {
          commit("SET_LOGIN_ERROR", "Ce compte est inactif.");
          throw new Error("Unauthorized access");
        }

        commit("LOGIN", userData);
      } catch (error) {
        console.error("An error occurred during login:", error);
        if (!error.message.includes("Unauthorized access")) {
          commit("SET_LOGIN_ERROR", "An error occurred during login. Please try again.");
        }
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
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }

        await axios.post("http://localhost:8000/api/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    loginError: (state) => state.loginError, // Add this getter
  },

  modules: {
    users,
    // typeTickets,
    typeSubscriptions,
    transactions,
    tickets,
    subscriptions,
    trajets,
    datesDeparts
  },
});
