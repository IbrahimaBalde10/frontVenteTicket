<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="9">
          <VCard class="text-2xl font-weight-bold p-4">
            <VCardTitle class="text-2xl font-weight-bold">Liste des Dates de Départ</VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="3">
          <VBtn title="Ajouter une date de départ" color="primary"
           @click="goToAddDateDepart" >
            Ajouter une date de départ
          </VBtn>
        </VCol>
      </VRow>
      <VCard>
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th class="text-center">Identifiant</th>
                <th class="text-center">Date de Départ</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="date in paginatedDates" :key="date.id">
                <td class="text-center">{{ date.id }}</td>
                <td class="text-center">{{ date.dateDepart }}</td>
                <td class="text-center">
                  <VIcon @click="updateDate(date.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                  <VIcon @click="confirmDelete(date.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="fetchDates"
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
        Êtes-vous sûr de vouloir supprimer cette date de départ ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deleteDate" color="error">Supprimer</VBtn>
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

const goToAddDateDepart = () => {
  router.push(`/trajets/${trajetId}/addDateDepart`);
};

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
});

const dialog = ref({
  show: false,
  dateId: null,
});

const currentPage = ref(1);

const fetchDates = (page) => {
  store.dispatch('datesDeparts/fetchDates', { trajetId, page, perPage: store.getters['datesDeparts/perPage'] });
};

onMounted(() => {
  fetchDates(currentPage.value);
});

const allDates = computed(() => store.getters['datesDeparts/allDates'] || []);
const totalPages = computed(() => Math.ceil(store.getters['datesDeparts/totalDates'] / store.getters['datesDeparts/perPage']));

const paginatedDates = computed(() => {
  if (!allDates.value || allDates.value.length === 0) return [];
  const start = (currentPage.value - 1) * store.getters['datesDeparts/perPage'];
  const end = start + store.getters['datesDeparts/perPage'];
  return allDates.value.slice(start, end);
});

// const updateDate = (dateId) => {
//   router.push({ name: 'date-edit', params: { id: dateId } });
// };

// const updateDate = (trajetId, dateId) => {
//   router.push({ name: 'date-edit', params: { trajetId, dateId } });
// };

</script>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
