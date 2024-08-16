<template>
  <VCard class="pa-8">
    <VCardTitle>Ajouter une heure de Départ</VCardTitle>

    <VForm @submit.prevent="submitheureDepart">
      <VTextField
        v-model="heureDepart"
        label="heure de départ"
        type="time"
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
const heureDepart = ref('');

const submitheureDepart = async () => {
  const trajetId = route.params.id;

  try {
    await store.dispatch('heuresDeparts/ajouterheureDepart', {
      trajetId,
      heureDepart: heureDepart.value
    });
    // Redirection ou message de succès
    // router.push('/some-success-page'); 
     router.push({ name: 'heureDepartManagement', params: { id: trajetId } });

  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de l\'ajout de la heure de départ:', error);
  }
};
</script>
