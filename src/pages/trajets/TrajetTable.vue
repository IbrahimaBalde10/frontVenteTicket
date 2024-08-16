<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="9">
          <VCard class="text-2xl font-weight-bold p-4">
            <VCardTitle class="text-2xl font-weight-bold">Liste des trajets</VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="3">
          <VBtn title="Ajouter un trajet" color="primary" @click="() => router.push('/addTrajet')">
            Ajouter un trajet
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
                <th class="text-center">Départ</th>
                <th class="text-center">Arrivée</th>
                <!-- <th class="text-center">Description</th> -->
                <th class="text-center">Prix</th>
                <th class="text-center">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trajet in paginatedTrajets" :key="trajet.id">
                <td class="text-center">{{ trajet.id }}</td>
                <td class="text-center">{{ trajet.nom }}</td>
                <td class="text-center">{{ trajet.point_depart }}</td>
                <td class="text-center">{{ trajet.point_arrivee }}</td>
                <!-- <td class="text-center">{{ trajet.description }}</td> -->
                <td class="text-center">{{ trajet.prix }}</td>
                <td class="text-center">{{ trajet.statut }}</td>
                <td class="text-center">
                  <VIcon @click="showTrajetDetails(trajet.id)" class="ms-2" color="primary" small>mdi-eye</VIcon>
                  <VIcon @click="updateTrajet(trajet.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                  <VIcon @click="confirmDelete(trajet.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="(page) => store.dispatch('trajets/fetchTrajets', { page, perPage: store.getters['trajets/perPage'] })"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <TrajetDetail :trajetId="selectedTrajetId" v-model:show="showTrajetDetailDialog" />

  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer la Suppression</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer ce trajet ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deleteTrajet" color="error">Supprimer</VBtn>
        <VBtn @click="() => dialog.show = false">Annuler</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VSnackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :multi-line="true" :vertical="true">
    {{ snackbar.text }}
  </VSnackbar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TrajetDetail from './Trajet_Show.vue'; // Assurez-vous que le chemin est correct

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
  trajetId: null
});

const showTrajetDetailDialog = ref(false);
const selectedTrajetId = ref(null);

const currentPage = ref(1);

onMounted(() => {
  store.dispatch('trajets/fetchTrajets', { page: currentPage.value, perPage: 5 });
});

const allTrajets = computed(() => store.getters['trajets/allTrajets']);
const totalPages = computed(() => Math.ceil(store.getters['trajets/totalTrajets'] / store.getters['trajets/perPage']));

const paginatedTrajets = computed(() => {
  const start = (currentPage.value - 1) * store.getters['trajets/perPage'];
  const end = start + store.getters['trajets/perPage'];
  return allTrajets.value.slice(start, end);
});

const showTrajetDetails = (trajetId) => {
  selectedTrajetId.value = trajetId;
  showTrajetDetailDialog.value = true;
};

const updateTrajet = (trajetId) => {
  router.push({ name: 'trajet-edit', params: { id: trajetId } });
};

const confirmDelete = (trajetId) => {
  dialog.value = {
    show: true,
    trajetId: trajetId
  };
};

const deleteTrajet = async () => {
  try {
    await store.dispatch('trajets/deleteTrajet', dialog.value.trajetId);
    store.dispatch('trajets/fetchTrajets', { page: currentPage.value, perPage: store.getters['trajets/perPage'] });
    dialog.value.show = false;
    snackbar.value = {
      show: true,
      text: 'Trajet supprimé avec succès',
      color: 'success'
    };
  } catch (error) {
    console.error('Failed to delete trajet:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de la suppression du trajet',
      color: 'error'
    };
  }
};
</script>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
