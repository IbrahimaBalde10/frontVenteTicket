<template>
  <VDialog :model-value="show" @update:model-value="updateShow" max-width="800px">
    <VCard>
      <VCardTitle class="headline">Détails du Trajet</VCardTitle>
      <VCardText>
        <VList v-if="trajet">
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Identifiant:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.id }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Nom du trajet:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.nom }}</VListItemSubtitle>
            </VListItemContent>
             <VListItemContent>
              <VListItemTitle>Depart</VListItemTitle>
              <VListItemSubtitle>{{ trajet.point_depart }}</VListItemSubtitle>
            </VListItemContent>
              <VListItemContent>
              <VListItemTitle>Arrivée</VListItemTitle>
              <VListItemSubtitle>{{ trajet.point_arrivee }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Prix:</VListItemTitle>
              <VListItemSubtitle>{{ Number(trajet.prix).toLocaleString('fr-FR', {minimumFractionDigits: 0}) }} CFA</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Description:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.description }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Statut:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.statut }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>

          <!-- Dates de départ avec pagination
          <VCardTitle class="headline">Dates de Départ</VCardTitle>
          <VRow>
            <VCol
              v-for="date in paginatedDates"
              :key="date.id"
              cols="3"
              class="date-item"
              @mouseover="hoverDate = date.id"
              @mouseleave="hoverDate = null"
            >
              <div>{{ date.dateDepart }}</div>
              <div v-if="hoverDate === date.id" class="action-icons">
                <VIcon @click="updateDate(date.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                <VIcon @click="confirmDelete(date.id)" color="error" small>mdi-delete</VIcon>
              </div>
            </VCol>
          </VRow> -->

          <!-- Pagination -->
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="fetchDates"
          />
        </VList>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="closeDialog">Fermer</VBtn>
      </VCardActions>
    </VCard>

    <!-- Confirmation dialog for deletion -->
    <VDialog v-model="dialog.show" max-width="290">
      <VCard>
        <VCardTitle class="headline">Confirmer la suppression</VCardTitle>
        <VCardText>Êtes-vous sûr de vouloir supprimer cette date de départ ?</VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue darken-1" text @click="dialog.show = false">Annuler</VBtn>
          <VBtn color="red darken-1" text @click="deleteDate">Supprimer</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Snackbar for notifications -->
    <VSnackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </VSnackbar>
  </VDialog>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const show = ref(false);
const trajet = ref({});
const currentPage = ref(1);
const perPage = 10; // Nombre d'éléments par page
const props = defineProps(['trajetId']);
const hoverDate = ref(null);
const dialog = ref({ show: false, dateId: null });
const snackbar = ref({ show: false, text: '', color: '' });

const updateShow = (value) => {
  show.value = value;
};

const closeDialog = () => {
  show.value = false;
};

const fetchDates = async (page) => {
  try {
    await store.dispatch('datesDeparts/fetchDates', { trajetId: props.trajetId, page, perPage });
  } catch (error) {
    console.error('Erreur lors de la récupération des dates:', error);
  }
};

const allDates = computed(() => store.getters['datesDeparts/allDates'] || []);
const totalPages = computed(() => Math.ceil(store.getters['datesDeparts/totalDates'] / perPage));

const paginatedDates = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return allDates.value.slice(start, end);
});

watch(
  () => props.trajetId,
  async (newId) => {
    if (newId) {
      try {
        trajet.value = await store.dispatch('trajets/fetchTrajetById', newId);
        await fetchDates(currentPage.value);
        await nextTick();  // Force Vue.js to mettre à jour le DOM
        show.value = true;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du trajet:', error);
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  fetchDates(currentPage.value);
});

const updateDate = (dateId) => {
  router.push({ name: 'date-edit', params: { trajetId: props.trajetId, dateId } });
};

const confirmDelete = (dateId) => {
  dialog.value = {
    show: true,
    dateId: dateId,
  };
};

const deleteDate = async () => {
  try {
    await store.dispatch('datesDeparts/deleteDate', { trajetId: props.trajetId, dateId: dialog.value.dateId });
    fetchDates(currentPage.value);
    dialog.value.show = false;
    snackbar.value = {
      show: true,
      text: 'Date de départ supprimée avec succès',
      color: 'success',
    };
  } catch (error) {
    console.error('Failed to delete date:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de la suppression de la date de départ',
      color: 'error',
    };
  }
};
</script>

<style scoped>
.date-item {
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
}

.action-icons {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
