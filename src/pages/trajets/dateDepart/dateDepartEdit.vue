<template>
  <VRow>
    <VCol cols="12">
      <VCard class="auth-card pa-8" max-width="600">
        <VCardTitle class="text-2xl font-weight-bold">
          Modifier une Date de Départ
        </VCardTitle>

        <VCardText>
          <VForm @submit.prevent="submitForm">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="dateData.dateDepart"
                  label="Date de départ"
                  type="date"
                  :error-messages="errors.dateDepart"
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
                  @click="goToDateDepartManagement"
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

const dateData = ref({ dateDepart: '' });
const errors = ref({
  dateDepart: ''
});
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
});

const validateForm = () => {
  let isValid = true;

  if (!dateData.value.dateDepart) {
    errors.value.dateDepart = 'Date de départ est requise';
    isValid = false;
  } else {
    errors.value.dateDepart = '';
  }

  return isValid;
};

const fetchDateDetails = async () => {
  const { trajetId, dateId } = route.params;
  try {
    const fetchedDate = await store.dispatch('datesDeparts/fetchDateDetails', { trajetId, dateId });
    dateData.value = fetchedDate;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la date:', error);
  }
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const { trajetId, dateId } = route.params;
    await store.dispatch('datesDeparts/updateDate', { trajetId, dateId, dateData: dateData.value });
    snackbar.value.message = 'Date de départ mise à jour avec succès';
    snackbar.value.color = 'success';
    snackbar.value.show = true;

    await nextTick();
    setTimeout(() => {
      snackbar.value.show = false;
      router.push({ name: 'dateDepartManagement', params: { id: trajetId } });

    }, snackbar.value.timeout);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la date de départ:', error);
    snackbar.value.message = 'Erreur lors de la mise à jour de la date de départ';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
  }
};

const goToDateDepartManagement = () => {
  const trajetId = route.params.trajetId; // ou obtenir trajetsId depuis une autre source si nécessaire
  router.push({ name: 'dateDepartManagement', params: { id: trajetId } });
};


onMounted(fetchDateDetails);
</script>
<style scoped>
.auth-card {
  padding: 24px;
  padding-top: 28px;
  max-width: 800px;
}
</style>
