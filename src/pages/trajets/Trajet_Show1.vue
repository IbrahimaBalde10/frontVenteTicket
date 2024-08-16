<template>
  <VDialog :model-value="show" @update:model-value="updateShow" max-width="600px">
    <VCard>
      <VCardTitle class="headline">Détails du trajet</VCardTitle>
      <VCardText>
        <VList v-if="trajet && trajet.dates_de_depart && trajet.heures_de_depart">
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Identifiant:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.id }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Nom:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.nom }}</VListItemSubtitle>
            </VListItemContent>
          </VListItem>
           <VListItem>
            <VListItemContent>
              <VListItemTitle>Prix:</VListItemTitle>
              <VListItemSubtitle>{{ trajet.prix }}</VListItemSubtitle>
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
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Dates de départ:</VListItemTitle>
              <VListItemSubtitle>
                <ul>
                  <li v-for="date in trajet.dates_de_depart" :key="date.id">
                    {{ date.dateDepart }}
                  </li>
                </ul>
              </VListItemSubtitle>
            </VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>
              <VListItemTitle>Heures de départ:</VListItemTitle>
              <VListItemSubtitle>
                <ul>
                  <li v-for="heure in trajet.heures_de_depart" :key="heure.id">
                    {{ heure.heureDepart }}
                  </li>
                </ul>
              </VListItemSubtitle>
            </VListItemContent>
          </VListItem>
        </VList>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="closeDialog">Fermer</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const show = ref(false);
const trajet = ref({});
const props = defineProps(['trajetId']);

const updateShow = (value) => {
  show.value = value;
};

const closeDialog = () => {
  show.value = false;
};

watch(
  () => props.trajetId,
  async (newId) => {
    if (newId) {
      try {
        trajet.value = await store.dispatch('trajets/fetchTrajetById', newId);
        await nextTick();  // Force Vue.js to update the DOM
        console.log('Trajet fetched:', trajet.value);  // Log for debugging
        show.value = true;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du trajet:', error);
      }
    }
  },
  { immediate: true }
);

</script>
