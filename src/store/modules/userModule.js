// src/store/modules/userModule.js
import axios from 'axios';
import router from '@/router';

const state = {
  users: [],
  // total: 0,  // Total des utilisateurs
  // perPage: 10, // Nombre d'utilisateurs par page
  // currentPage: 1 // Page actuelle
  total: 0,
  perPage: 10,
  currentPage: 1
};
 

const getters = {
  allUsers: (state) => state.users,
  getUserById: (state) => (id) => state.users.find(user => user.id === id),
  userCount: state => state.users.length, //compter les users
  // 
  // allUsers: (state) => state.users,
  totalUsers: (state) => state.total,
  perPage: (state) => state.perPage,
  currentPage: (state) => state.currentPage
  // 
};

const actions = {
  // async fetchUsers({ commit }) {
    // try {
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     throw new Error('No token found');
    //   }

    //   const response = await axios.get('http://localhost:8000/api/users', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
     
  //     commit('setUsers', response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       if (error.response.status === 403) {
  //         console.error('Forbidden: You do not have the right permissions to access this resource.');
  //       } else if (error.response.status === 401) {
  //         console.error('Unauthorized: Invalid or expired token.');
  //         router.push({ name: 'login' });
  //       } else {
  //         console.error(`Error ${error.response.status}: ${error.response.data.message}`);
  //       }
  //     } else {
  //       console.error('Failed to fetch users:', error);
  //     }
  //   }
  // }

async fetchUsers({ commit }, { page = 1, perPage = 10 } = {}) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          perPage
        }
      });
      
      commit('SET_USERS', response.data.data); // Assurez-vous de gérer la structure des données renvoyées
      commit('SET_TOTAL', response.data.total); // Total des utilisateurs (pour pagination)
      commit('SET_PER_PAGE', response.data.per_page); // Nombre d'utilisateurs par page
      commit('SET_CURRENT_PAGE', page); // Mettre à jour la page actuelle
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  // recuperation du user connecté
async fetchCurrentUser({ commit }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:8000/api/users/showProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit('setCurrentUser', response.data); // Assurez-vous que 'setCurrentUser' met à jour l'état du store avec les données de l'utilisateur
    return response.data; // Retournez les données de l'utilisateur pour pouvoir les utiliser dans le composant Vue
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
      console.error('Failed to fetch user:', error);
    }
    throw error; // Assurez-vous que l'erreur est levée pour gérer les erreurs dans le composant Vue
  }
},

  async fetchUserById({ commit }, id) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  },

  async addUser({ commit }, user) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:8000/api/users', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('addUser', response.data);
    } catch (error) {
      console.error('Failed to add user:', error);
      throw error;
    }
  },

// modifier un user quelconque
  async updateUser({ commit }, user) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('updateUser', response.data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  },
  
// modifier mon profil
 async updateMyProfil({ commit }, user) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setCurrentUser', response.data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  },
  // async deleteUser({ commit }, userId) {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }

  //     await axios.delete(`http://localhost:8000/api/users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit('removeUser', userId);
  //     return 'Utilisateur supprimé avec succès'; // Message de succès
  //   } catch (error) {
  //     console.error('Failed to delete user:', error);
  //     throw error;
  //   }
  // }
  
   async deleteUser({ commit }, userId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('removeUser', userId);
        return 'Utilisateur supprimé avec succès'; // Message de succès
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Erreur lors de la suppression de l\'utilisateur'); // Message d'erreur
      }
    },
  
async activateUser({ commit }, userId) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(`http://localhost:8000/api/users/${userId}/activate`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit('setUserStatus', { userId, status: 'active' }); // Mettez à jour l'état avec le statut 'active'
  } catch (error) {
    console.error('Error activating user:', error.response ? error.response.data : error.message);
    throw error;
  }
},

async deactivateUser({ commit }, userId) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(`http://localhost:8000/api/users/${userId}/deactivate`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit('setUserStatus', { userId, status: 'inactive' }); // Mettez à jour l'état avec le statut 'inactive'
  } catch (error) {
    console.error('Error deactivating user:', error.response ? error.response.data : error.message);
    throw error;
  }
},


};

const mutations = {
  // setUsers(state, users) {
  //   state.users = users;
  // },

  setUsers: (state, users) => (state.users = users),
  setMeta: (state, meta) => (state.meta = meta),
  //  SET_USERS(state, users) {
  //   state.users = users;
  // },

  // 
 SET_USERS(state, users) {
    state.users = users;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  }
   //
   , 
  addUser(state, user) {
    state.users.push(user);
  },
  setCurrentUser(state, user) {
        state.users = user;
  },
//   setCurrentUser(state, user) {
//   const index = state.users.findIndex((u) => u.id === user.id);
//   if (index !== -1) {
//     state.users.splice(index, 1, user);
//   } else {
//     state.users.push(user); // Ajouter si l'utilisateur n'existe pas
//   }
// }
  updateUser(state, updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  removeUser(state, userId) {
    state.users = state.users.filter((user) => user.id !== userId);
  },
 setUserStatus(state, { userId, status }) {
  const user = state.users.find(user => user.id === userId);
  if (user) {
    user.status = status;
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
