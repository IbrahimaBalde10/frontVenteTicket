<template>
  <VRow>
    <VCol cols="12">
      <VCard class="auth-card pa-8" max-width="1100">
        <VCardTitle class="text-2xl font-weight-bold">
          Modifier un trajet
        </VCardTitle>

        <VCardText>
          <VForm @submit.prevent="updateTrajet">
            <VRow>
              <!-- Point de départ -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="trajet.point_depart"
                  label="Point de départ"
                  placeholder="Enter departure point"
                  :error-messages="errors.point_depart"
                  required
                />
              </VCol>

              <!-- Point d'arrivée -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="trajet.point_arrivee"
                  label="Point d'arrivée"
                  placeholder="Enter arrival point"
                  :error-messages="errors.point_arrivee"
                  required
                />
              </VCol>

              <!-- Prix -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="trajet.prix"
                  label="Prix"
                  placeholder="Enter price"
                  :error-messages="errors.prix"
                  type="number"
                  required
                />
              </VCol>

              <!-- Statut -->
              <VCol cols="12" sm="6">
                <VSelect
                  v-model="trajet.statut"
                  :items="statutes"
                  label="Statut"
                  placeholder="Select statut"
                  :error-messages="errors.statut"
                  required
                />
              </VCol>

              <!-- Description -->
              <VCol cols="12">
                <VTextField
                  v-model="trajet.description"
                  label="Description (optionnelle)"
                  placeholder="Entrez la description"
                  :error-messages="errors.description"
                  rows="6"
                  multi-line
                />
              </VCol>

              <!-- Navigation vers la modification des dates de départ -->
              <!-- <VCol cols="12" sm="6">
                <VBtn @click="navigateTo('dateDepartManagement')" color="primary">Gestion Dates de Départ</VBtn>
              </VCol> -->
              <VCol cols="12" sm="6">
                <VBtn @click="navigateToDateDepartManagement(trajet.id)" color="primary">Gestion Dates de Départ</VBtn>
              </VCol>
              <!-- Navigation vers la modification des heures de départ -->
              <VCol cols="12" sm="6">
                <VBtn @click="navigateToHeureDepartManagement(trajet.id)" color="primary">Gestion Heures de Départ</VBtn>
              </VCol>

              <!-- Boutons de soumission -->
              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <VBtn block type="submit" color="primary">Modifier</VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn block @click="() => router.push('/trajetManagement')" color="error">Annuler</VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <!-- Snackbar pour les messages -->
        <VSnackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
        >
          {{ snackbar.message }}
        </VSnackbar>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const trajet = ref({
  id: '',
  point_depart: '',
  point_arrivee: '',
  prix: '',
  description: '',
  statut: '', // Ajout du champ statut
});

const errors = ref({
  point_depart: '',
  point_arrivee: '',
  prix: '',
  description: '',
  statut: '', // Ajout du champ statut
});

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
});

const statutes = ['actif', 'inactif']; // Définir les statuts disponibles

onMounted(async () => {
  const trajetId = route.params.id;

  if (trajetId) {
    try {
      const fetchedTrajet = await store.dispatch('trajets/fetchTrajetById', trajetId);
      trajet.value = fetchedTrajet;
    } catch (error) {
      console.error('Error fetching trajet:', error);
    }
  }
});

const validateForm = () => {
  let isValid = true;

  if (!trajet.value.point_depart) {
    errors.value.point_depart = 'Point de départ est requis';
    isValid = false;
  } else {
    errors.value.point_depart = '';
  }

  if (!trajet.value.point_arrivee) {
    errors.value.point_arrivee = 'Point d\'arrivée est requis';
    isValid = false;
  } else {
    errors.value.point_arrivee = '';
  }

  if (!trajet.value.prix) {
    errors.value.prix = 'Prix est requis';
    isValid = false;
  } else {
    errors.value.prix = '';
  }

  if (!trajet.value.statut) {
    errors.value.statut = 'Statut est requis';
    isValid = false;
  } else {
    errors.value.statut = '';
  }

  return isValid;
};

const updateTrajet = async () => {
  if (validateForm()) {
    try {
      await store.dispatch('trajets/updateTrajet', trajet.value);
  snackbar.value.message = 'Trajet modifier avec succès';
    snackbar.value.color = 'success';
    snackbar.value.show = true;

    await nextTick();
    setTimeout(() => {
      snackbar.value.show = false;
      router.push({ name: 'trajetManagement' });
    }, snackbar.value.timeout);
  } catch (error) {
    snackbar.value.message = 'Erreur lors de la modificatio du trajet';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
  }
  }
};

const navigateTo = (section) => {
  const trajetId = route.params.id;
  router.push(`/trajets/${trajetId}/${section}`);
};

const navigateToDateDepartManagement = (trajetId) => {
  router.push({ name: 'dateDepartManagement', params: { id: trajetId } });
};

const navigateToHeureDepartManagement = (trajetId) => {
  router.push({ name: 'heureDepartManagement', params: { id: trajetId } });
};
</script>

<style scoped>
.auth-card {
  margin: auto;
  padding: 2rem;
}
</style>
