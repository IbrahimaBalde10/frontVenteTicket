<!-- src/views/pages/EditUser.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const user = ref({ id: '', nom: '', prenom: '', telephone: '', role: '', email: '' });

onMounted(async () => {
  const userId = route.params.id;
  try {
    const fetchedUser = await store.dispatch('users/fetchUserById', userId);
    user.value = fetchedUser;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
});

const updateUser = async () => {
  try {
    await store.dispatch('users/updateUser', user.value);
    router.push({ name: 'userManagement' }); // Make sure you have a route named 'userManagement'
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
</script>

<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser" class="edit-user-form">
      <VRow>
        <VCol cols="6">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" id="nom" v-model="user.nom" required />
          </div>
        </VCol>
        <VCol cols="6">
          <div class="form-group">
            <label for="prenom">Prenom</label>
            <input type="text" id="prenom" v-model="user.prenom" required />
          </div>
        </VCol>
        <VCol cols="6">
          <div class="form-group">
            <label for="telephone">Telephone</label>
            <input type="text" id="telephone" v-model="user.telephone" required />
          </div>
        </VCol>
        <VCol cols="6">
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="user.role" required>
              <option value="Admin">Admin</option>
              <option value="Comptable">Comptable</option>
              <option value="Client">Client</option>
              <option value="Vendeur">Vendeur</option>
            </select>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email" required />
          </div>
        </VCol>
        <VCol cols="12">
          <button type="submit" class="submit-button">Update User</button>
        </VCol>
      </VRow>
    </form>
  </div>
</template>

<style scoped>
.edit-user-form {
  max-width: 800px;
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
