<template>
  <VRow>
    <VCol cols="12">
      <VCard class="auth-card pa-8 pt-7" gap-5 max-width="1100">
        <VCardTitle class="text-2xl font-weight-bold">
          Ajouter un trajet
        </VCardTitle>

        <VCardText>
          <VForm @submit.prevent="addTrajet">
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField 
                  v-model="newTrajet.point_depart" 
                  label="Point de départ" 
                  placeholder="Enter point de départ" 
                  :error-messages="errors.point_depart" 
                  required
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField 
                  v-model="newTrajet.point_arrivee" 
                  label="Point d'arrivée" 
                  placeholder="Enter point d'arrivée" 
                  :error-messages="errors.point_arrivee" 
                  required
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField 
                  v-model="newTrajet.prix" 
                  label="Prix" 
                  placeholder="Enter prix" 
                  :error-messages="errors.prix" 
                  type="number"
                  required
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VSelect 
                  v-model="newTrajet.statut" 
                  :items="statusOptions" 
                  label="Statut" 
                  placeholder="Select statut" 
                  :error-messages="errors.statut" 
                  required
                />
              </VCol>

              <VCol cols="12">
                <VTextField 
                  v-model="newTrajet.description" 
                  label="Description" 
                  placeholder="Entrer une description" 
                  :error-messages="errors.description" 
                />
              </VCol>

              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <VTextField
                      v-model="dateDepart"
                      type="date"
                      label="Date de départ"
                      placeholder="Enter une date de départ au format: YYYY-MM-DD"
                      :error-messages="errors.dates_de_depart"
                      @keyup.enter="addDateHeure"
                    />
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      v-model="heureDepart"
                      type="time"
                      label="Heure de départ"
                      placeholder="Enter une heure de départ au format: HH:mm"
                      :error-messages="errors.heures_de_depart"
                      @keyup.enter="addDateHeure"
                    />
                  </VCol>
                </VRow>
                <br>
                <VBtn @click="addDateHeure" color="primary">Ajouter date et heure</VBtn>
              </VCol>

              <VCol cols="12">
                <div v-for="(date, index) in newTrajet.dates_de_depart" :key="index">
                  Date de départ: {{ date }} - Heure de départ: {{ newTrajet.heures_de_depart[index] }}
                  <VBtn @click="removeDateHeure(index)" color="error">Supprimer</VBtn>
                </div>
              </VCol>

              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <VBtn block type="submit" color="primary">Ajouter un trajet</VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn block @click="() => router.push('/trajetManagement')" color="error">Annuler</VBtn>
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
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const newTrajet = ref({
  point_depart: '',
  point_arrivee: '',
  prix: '',
  statut: '',
  description: '',
  dates_de_depart: [],
  heures_de_depart: []
});

const dateDepart = ref('');
const heureDepart = ref('');
const statusOptions = ['actif', 'inactif'];

const errors = ref({
  point_depart: '',
  point_arrivee: '',
  prix: '',
  statut: '',
  dates_de_depart: '',
  heures_de_depart: ''
});

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
});

const validateForm = () => {
  let isValid = true;

  if (!newTrajet.value.point_depart) {
    errors.value.point_depart = 'Point de départ is required';
    isValid = false;
  } else {
    errors.value.point_depart = '';
  }

  if (!newTrajet.value.point_arrivee) {
    errors.value.point_arrivee = 'Point d\'arrivée is required';
    isValid = false;
  } else {
    errors.value.point_arrivee = '';
  }

  if (!newTrajet.value.prix) {
    errors.value.prix = 'Prix is required';
    isValid = false;
  } else {
    errors.value.prix = '';
  }

  if (!newTrajet.value.statut) {
    errors.value.statut = 'Statut is required';
    isValid = false;
  } else {
    errors.value.statut = '';
  }

  if (newTrajet.value.dates_de_depart.length === 0) {
    errors.value.dates_de_depart = 'At least one date de départ is required';
    isValid = false;
  } else {
    errors.value.dates_de_depart = '';
  }

  if (newTrajet.value.heures_de_depart.length === 0) {
    errors.value.heures_de_depart = 'At least one heure de départ is required';
    isValid = false;
  } else {
    errors.value.heures_de_depart = '';
  }

  return isValid;
};

const addDateHeure = () => {
  if (dateDepart.value && heureDepart.value) {
    newTrajet.value.dates_de_depart.push(dateDepart.value);
    newTrajet.value.heures_de_depart.push(heureDepart.value);
    dateDepart.value = '';
    heureDepart.value = '';
  }
};

const removeDateHeure = (index) => {
  newTrajet.value.dates_de_depart.splice(index, 1);
  newTrajet.value.heures_de_depart.splice(index, 1);
};

const addTrajet = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    await store.dispatch('trajets/addTrajet', newTrajet.value);
    snackbar.value.message = 'Trajet ajouté avec succès';
    snackbar.value.color = 'success';
    snackbar.value.show = true;

    await nextTick();
    setTimeout(() => {
      snackbar.value.show = false;
      router.push({ name: 'trajetManagement' });
    }, snackbar.value.timeout);
  } catch (error) {
    snackbar.value.message = 'Erreur lors de l\'ajout du trajet';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
  }
};
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.auth-card {
  padding: 24px;
  padding-top: 28px;
  max-width: 600px;
}

.submit-button {
  margin-top: 16px;
}
</style>
