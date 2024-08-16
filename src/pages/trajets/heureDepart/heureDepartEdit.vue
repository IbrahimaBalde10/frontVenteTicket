<template>
  <VRow>
    <VCol cols="12">
      <VCard class="auth-card pa-8" max-width="600">
        <VCardTitle class="text-2xl font-weight-bold">
          Modifier une heure de Départ
        </VCardTitle>

        <VCardText>
          <VForm @submit.prevent="submitForm">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="heureData.heureDepart"
                  label="heure de départ"
                  type="time"
                  :error-messages="errors.heureDepart"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <VBtn block type="submit" color="primary">Mettre à jour</VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn
                  block
                  @click="goToheureDepartManagement"
                  color="error"
                >
                  Annuler
                </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

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
import { ref, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const heureData = ref({ heureDepart: '' });
const errors = ref({
  heureDepart: ''
});
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
});

const valiheureForm = () => {
  let isValid = true;

  if (!heureData.value.heureDepart) {
    errors.value.heureDepart = 'heure de départ est requise';
    isValid = false;
  } else {
    errors.value.heureDepart = '';
  }

  return isValid;
};

const fetchheureDetails = async () => {
  const { trajetId, heureId } = route.params;
  try {
    const fetchedheure = await store.dispatch('heuresDeparts/fetchheureDetails', { trajetId, heureId });
    heureData.value = fetchedheure;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la heure:', error);
  }
};

const submitForm = async () => {
  if (!valiheureForm()) {
    return;
  }

  try {
    const { trajetId, heureId } = route.params;
    await store.dispatch('heuresDeparts/upheureheure', { trajetId, heureId, heureData: heureData.value });
    snackbar.value.message = 'heure de départ mise à jour avec succès';
    snackbar.value.color = 'success';
    snackbar.value.show = true;

    await nextTick();
    setTimeout(() => {
      snackbar.value.show = false;
      router.push({ name: 'heureDepartManagement', params: { id: trajetId } });

    }, snackbar.value.timeout);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la heure de départ:', error);
    snackbar.value.message = 'Erreur lors de la mise à jour de la heure de départ';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
  }
};

const goToheureDepartManagement = () => {
  const trajetId = route.params.trajetId; // ou obtenir trajetsId depuis une autre source si nécessaire
  router.push({ name: 'heureDepartManagement', params: { id: trajetId } });
};


onMounted(fetchheureDetails);
</script>
<style scoped>
.auth-card {
  padding: 24px;
  padding-top: 28px;
  max-width: 800px;
}
</style>
