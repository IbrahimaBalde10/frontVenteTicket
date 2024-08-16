<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="9">
          <VCard class="text-2xl font-weight-bold p-4">
            <VCardTitle class="text-2xl font-weight-bold">Liste des heures de Départ</VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="3">
          <VBtn title="Ajouter une heure de départ" color="primary"
           @click="goToAddheureDepart" >
            Ajouter une heure de départ
          </VBtn>
        </VCol>
      </VRow>
      <VCard>
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th class="text-center">Identifiant</th>
                <th class="text-center">heure de Départ</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="heure in paginatedheures" :key="heure.id">
                <td class="text-center">{{ heure.id }}</td>
                <td class="text-center">{{ heure.heureDepart }}</td>
                <td class="text-center">
                  <VIcon @click="upheureheure(heure.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                  <VIcon @click="confirmDelete(heure.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @upheure:page="fetchheures"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer la Suppression</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer cette heure de départ ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deleteheure" color="error">Supprimer</VBtn>
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
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();


const trajetId = route.params.id;

const goToAddheureDepart = () => {
  router.push(`/trajets/${trajetId}/addheureDepart`);
};

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
});

const dialog = ref({
  show: false,
  heureId: null,
});

const currentPage = ref(1);

const fetchheures = (page) => {
  store.dispatch('heuresDeparts/fetchheures', { trajetId, page, perPage: store.getters['heuresDeparts/perPage'] });
};

onMounted(() => {
  fetchheures(currentPage.value);
});

const allheures = computed(() => store.getters['heuresDeparts/allheures'] || []);
const totalPages = computed(() => Math.ceil(store.getters['heuresDeparts/totalheures'] / store.getters['heuresDeparts/perPage']));

const paginatedheures = computed(() => {
  if (!allheures.value || allheures.value.length === 0) return [];
  const start = (currentPage.value - 1) * store.getters['heuresDeparts/perPage'];
  const end = start + store.getters['heuresDeparts/perPage'];
  return allheures.value.slice(start, end);
});

// const upheureheure = (heureId) => {
//   router.push({ name: 'heure-edit', params: { id: heureId } });
// };

// const upheureheure = (trajetId, heureId) => {
//   router.push({ name: 'heure-edit', params: { trajetId, heureId } });
// };

</script>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
