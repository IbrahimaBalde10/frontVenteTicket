<!-- src/views/pages/UserTable.vue -->
<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('users/fetchUsers');
});

const allUsers = computed(() => store.getters['users/allUsers'].filter(user => user.role === 'Vendeur'));

const updateUser = (userId) => {
  router.push({ name: 'user-edit', params: { id: userId } });
};

const deleteUser = async (userId) => {
  try {
    await store.dispatch('users/deleteUser', userId);
    store.dispatch('users/fetchUsers'); // Refresh the user list after deletion
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Liste des vendeurs">
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Tel</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in allUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.nom }}</td>
                <td>{{ user.prenom }}</td>
                <td>{{ user.telephone }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <VIcon @click="updateUser(user.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                  <VIcon @click="deleteUser(user.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
