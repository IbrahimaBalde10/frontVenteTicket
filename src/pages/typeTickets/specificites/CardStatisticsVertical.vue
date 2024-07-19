<script lang="ts" setup>
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const store = useStore();

onMounted(() => {
  store.dispatch('tickets/fetchTickets');
  store.dispatch('tickets/fetchTicketsByType');
  store.dispatch('tickets/fetchTotalRevenueByType');
});

const ticketsByType = computed(() => store.getters['tickets/ticketsByType']);
const totalRevenueByType = computed(() => store.getters['tickets/totalRevenueByType']);

const ticketData = computed(() => {
  return ticketsByType.value.map(ticket => [ticket.type_name, ticket.count]);
});

const revenueData = computed(() => {
  return totalRevenueByType.value.map(revenue => [revenue.type_name, revenue.total_revenue]);
});
</script>

<template>
  <div>
    <h3>Tickets par Type</h3>
    <pie-chart :data="ticketData" />

    <h3>Revenus par Type</h3>
    <bar-chart :data="revenueData" />
  </div>
</template>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
