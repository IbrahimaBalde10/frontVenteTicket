<!-- src/views/pages/AddUser.vue -->
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'


const store = useStore();
const router = useRouter();

const newUser = ref({ nom: '', prenom: '', telephone: '', role: '', email: '',password: '' });

const addUser = async () => {
  try {
    await store.dispatch('users/addUser', newUser.value);
    router.push({ name: 'userManagement' }); // Make sure you have a route named 'userManagement'
  } catch (error) {
    console.error('Error adding user:', error);
  }
};
</script>

<template>
  <div>
    <h1>Add User</h1>
    <form @submit.prevent="addUser" class="user-form">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input type="text" id="nom" v-model="newUser.nom" required />
      </div>
      <div class="form-group">
        <label for="prenom">Prenom</label>
        <input type="text" id="prenom" v-model="newUser.prenom" required />
      </div>
      <div class="form-group">
        <label for="telephone">Telephone</label>
        <input type="text" id="telephone" v-model="newUser.telephone" required />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="newUser.role" required>
          <option value="Admin">Admin</option>
          <option value="Comptable">Comptable</option>
          <option value="Client">Client</option>
          <option value="Vendeur">Vendeur</option>
        </select>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="newUser.email" required />
      </div>
       <div class="form-group">
        <label for="email">Password</label>
        <input type="password" id="password" v-model="newUser.password" required />
      </div>
      <button type="submit" class="submit-button">Add User</button>
    </form>
  </div>
   <VerticalNavLink
   color="sucess"
        :item="{
          title: 'Annuler',
          icon: 'bx-user-plus',
          to: '/userManagement',
        }"
      />
 <VerticalNavLink
   color="sucess"
        :item="{
          title: 'Dashboard',
          icon: 'bx-user-plus',
          to: '/',
        }"
      />
</template>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background: #0056b3;
}
</style>
