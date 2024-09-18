<template>
  <VDialog :model-value="show" @update:model-value="updateShow" max-width="800px">
    <VCard>
      <VCardTitle class="headline">Détails du subscriptionType</VCardTitle>
      <VCardText>
        <VList v-if="subscriptionType">
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Identifiant:</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.id }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Nom du subscriptionType:</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.nom }}</VListItemSubtitle>
            </VListItemContent>
             <VListItemContent>
              <VListItemTitle>Depart</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.point_depart }}</VListItemSubtitle>
            </VListItemContent>
              <VListItemContent>
              <VListItemTitle>Arrivée</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.point_arrivee }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Prix:</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.prix }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Description:</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.description }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Statut:</VListItemTitle>
              <VListItemSubtitle>{{ subscriptionType.statut }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>

        </VList>
      </VCardText>
    </VCard>
  </VDialog>
  
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const show = ref(false);
const subscriptionType = ref({});
const currentPage = ref(1);
const perPage = 10; // Nombre d'éléments par page
const props = defineProps(['subscriptionTypeId']);
const snackbar = ref({ show: false, text: '', color: '' });






watch(
  () => props.subscriptionTypeId,
  async (newId) => {
    if (newId) {
      try {
        subscriptionType.value = await store.dispatch('subscriptionTypes/fetchsubscriptionTypeById', newId);
        await nextTick();  // Force Vue.js to mettre à jour le DOM
        show.value = true;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du subscriptionType:', error);
      }
    }
  },
  { immediate: true }
);


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
