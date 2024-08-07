<template>
  <VCard class="pa-8">
    <VCardTitle>Ajouter une Date de Départ</VCardTitle>

    <VForm @submit.prevent="submitDateDepart">
      <VTextField
        v-model="dateDepart"
        label="Date de départ"
        type="date"
        required
      />
      <VBtn type="submit" color="primary">Ajouter</VBtn>
    </VForm>
  </VCard>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
const dateDepart = ref('');

const submitDateDepart = async () => {
  const trajetId = route.params.id;

  try {
    await store.dispatch('datesDeparts/ajouterDateDepart', {
      trajetId,
      dateDepart: dateDepart.value
    });
    // Redirection ou message de succès
    // router.push('/some-success-page'); 
     router.push({ name: 'dateDepartManagement', params: { id: trajetId } });

  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de l\'ajout de la date de départ:', error);
  }
};
</script>
