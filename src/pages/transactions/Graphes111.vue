<template>
  <div>
    <h1>Revenus quotidiens</h1>
    <div v-if="dailyRevenues.length">
      <ul>
        <li v-for="revenue in dailyRevenues" :key="revenue.date">
          {{ revenue.date }}: {{ revenue.total_revenue }}€
        </li>
      </ul>
    </div>
    <div v-else>
      Aucun revenu trouvé.
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('transactions/fetchDailyRevenues');
});

const dailyRevenues = computed(() => store.getters['transactions/dailyRevenues']);
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
