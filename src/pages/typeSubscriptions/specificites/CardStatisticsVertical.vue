<script lang="ts" setup>
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const store = useStore();

// Chargement des données sur le montage du composant
onMounted(() => {
  store.dispatch('subscriptions/fetchSubscriptions');
  store.dispatch('subscriptions/fetchSubscriptionsByType'); 
  store.dispatch('subscriptions/fetchTotalRevenueByType');
});

// Récupération des données depuis Vuex
const subscriptionsByType = computed(() => store.getters['subscriptions/subscriptionsByType']);
const totalRevenueByType = computed(() => store.getters['subscriptions/totalRevenueByType']);

// Préparation des données pour les graphiques
const subscriptionData = computed(() => {
  return subscriptionsByType.value.map(subscription => [subscription.type_name, subscription.count]);
});

const revenueData = computed(() => {
  return totalRevenueByType.value.map(revenue => [revenue.type_name, revenue.total_revenue]);
});
</script>
<template>
  <div>
    <h3>Subscriptions par Type</h3>
    <pie-chart :data="subscriptionData" />

    <h3>Revenus par Type de Subscription</h3>
    <bar-chart :data="revenueData" />
  </div>
</template>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
