<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import UserDetail from '../UserShow.vue'; // Assurez-vous que le chemin est correct

const store = useStore();
const router = useRouter();

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000
});

const dialog = ref({
  show: false,
  userId: null
});

const showUserDetailDialog = ref(false);
const selectedUserId = ref(null);

const currentPage = ref(1);

onMounted(() => {
  store.dispatch('users/fetchUsers', { page: currentPage.value, perPage: 4 });
});

const allUsers = computed(() => store.getters['users/allUsers'].filter(user => user.status === 'desactive'));

const totalPages = computed(() => Math.ceil(store.getters['users/totalUsers'] / store.getters['users/perPage']));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * store.getters['users/perPage'];
  const end = start + store.getters['users/perPage'];
  return allUsers.value.slice(start, end);
});

const showUserDetails = (userId) => {
  selectedUserId.value = userId;
  showUserDetailDialog.value = true;
};

const updateUser = (userId) => {
  router.push({ name: 'user-edit', params: { id: userId } });
};
const confirmUserDeletion = (userId) => {
  dialog.value = {
    show: true,
    userId: userId
  };
};
const confirmActivate = (userId) => {
  dialog.value = {
    show: true,
    userId: userId
  };
};

const activateUser = async () => {
  try {
    await store.dispatch('users/activateUser', dialog.value.userId);
    store.dispatch('users/fetchUsers', { page: currentPage.value, perPage: store.getters['users/perPage'] });
    snackbar.value = {
      show: true,
      text: 'Utilisateur activé avec succès',
      color: 'success',
      timeout: 3000
    };
  } catch (error) {
    console.error('Error activating user:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de l\'activation de l\'utilisateur',
      color: 'error',
      timeout: 3000
    };
  } finally {
    dialog.value.show = false;
  }
};


const confirmUserDeletionAction = async () => {
  try {
    await store.dispatch('users/deleteUser', dialog.value.userId);
    await store.dispatch('users/fetchUsers', { page: currentPage.value, perPage: store.getters['users/perPage'] });
    snackbar.value = {
      show: true,
      text: 'Utilisateur supprimé avec succès',
      color: 'success',
      timeout: 3000
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de la suppression de l\'utilisateur',
      color: 'error',
      timeout: 3000
    };
  } finally {
    dialog.value.show = false;
  }
};

</script>
<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="9">
          <VCard class="text-2xl font-weight-bold p-4">
            <VCardTitle class="text-2xl font-weight-bold">Liste des utilisateurs inactifs</VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="3">
          <VBtn title="Ajouter un utilisateur" color="primary" @click="() => router.push('/addUser')">
            Ajouter un utilisateur
          </VBtn>
        </VCol>
      </VRow>
      <VCard>
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th class="text-center">Identifiant</th>
                <th class="text-center">Nom</th>
                <th class="text-center">Prenom</th>
                <th class="text-center">Telephone</th>
                <th class="text-center">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td class="text-center">{{ user.id }}</td>
                <td class="text-center">{{ user.nom }}</td>
                <td class="text-center">{{ user.prenom }}</td>
                <td class="text-center">{{ user.telephone }}</td>
                <td class="text-center">{{ user.status }}</td>
                <td class="text-center">
                  <VIcon @click="showUserDetails(user.id)" class="ms-2" color="primary" small>mdi-eye</VIcon>
                  <VIcon @click="updateUser(user.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                   <VIcon @click="confirmUserDeletion(user.id)" color="error" small>mdi-delete</VIcon>
                  <VIcon @click="confirmActivate(user.id)" color="success" small>mdi-check-circle</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="(page) => store.dispatch('users/fetchUsers', { page, perPage: store.getters.perPage })"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <UserDetail :userId="selectedUserId" v-model:show="showUserDetailDialog" />

  <!-- Confirmation Dialog for Activation -->
  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer l'Activation</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir activer cet utilisateur ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="activateUser" color="success">Activer</VBtn>
        <VBtn @click="() => dialog.show = false">Annuler</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Confirmation Dialog for Deletion -->
  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer la Suppression</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer cet utilisateur ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="confirmUserDeletionAction" color="error">Supprimer</VBtn>
        <VBtn @click="() => dialog.show = false">Annuler</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Snackbar for success or error messages -->
  <VSnackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :multi-line="true" :vertical="true">
    {{ snackbar.text }}
  </VSnackbar>
</template>
