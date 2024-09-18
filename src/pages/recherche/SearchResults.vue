<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="searchTerm"
          label="Rechercher"
          @input="performSearch"
          debounce="500"  
        />
        <!-- Ajout d'un délai pour éviter les appels fréquents -->
        
        <VSubheader>Résultats de la Recherche</VSubheader>

       <!-- Afficher les résultats des trajets -->
        <VDataTable
        :headers="trajetHeaders"
        :items="searchResults.trajets"
        item-key="id"
        v-if="searchResults.trajets && searchResults.trajets.length"
        >
        <template v-slot:item="data">
            <tr>
            <td>{{ data.item.nom }}</td>
            <td>{{ data.item.description }}</td>
            </tr>
        </template>
        </VDataTable>

        <!-- Afficher les résultats des utilisateurs -->
        <VDataTable :headers="userHeaders" :items="searchResults.users" item-key="id" v-if="searchResults.users.length">
          <template v-slot:item="data">
            <tr>
              <td>{{ data.item.nom }} {{ data.item.prenom }}</td>
              <td>{{ data.item.email }}</td>
            </tr>
          </template>
        </VDataTable>

        <!-- Afficher les résultats des tickets -->
        <VDataTable :headers="ticketHeaders" :items="searchResults.tickets" item-key="id" v-if="searchResults.tickets.length">
          <template v-slot:item="data">
            <tr>
              <td>{{ data.item.type }}</td>
              <td>{{ data.item.statut }}</td>
            </tr>
          </template>
        </VDataTable>

      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchTerm = ref('');

const searchResults = computed(() => store.getters['recherche/searchResults']);

const trajetHeaders = [
  { text: 'Nom', value: 'nom' },
  { text: 'Description', value: 'description' },
];

const userHeaders = [
  { text: 'Nom', value: 'nom' },
  { text: 'Email', value: 'email' },
];

const ticketHeaders = [
  { text: 'Type', value: 'type' },
  { text: 'Statut', value: 'statut' },
];

const performSearch = () => {
  console.log('Search Term:', searchTerm.value); // Ajouter ce log
  if (searchTerm.value) {
    store.dispatch('recherche/search', searchTerm.value);
  } else {
    store.commit('recherche/SET_SEARCH_RESULTS', {
      tickets: [],
      users: [],
      trajets: [],
      subscription_types: [],
      subscriptions: [],
      transactions: []
    });
  }
};

// Ajout d'un observateur pour effectuer la recherche lorsqu'on tape dans le champ de recherche
watch(searchTerm, (newTerm) => {
  performSearch();
});
</script>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
