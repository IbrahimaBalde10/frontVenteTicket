<script lang="ts" setup>
// myImages
import userIcon from '@images/myImages/user.png'
import transactionIcon from '@images/myImages/transaction.png'
import ticketIcon from '@images/myImages/ticket.png'
// utisation de store

import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';
const icon = 'bx-log-in';
const store = useStore();
onMounted(() => {
  
  store.dispatch('tickets/fetchTickets');
  // 
  store.dispatch('tickets/fetchTicketsByType');
  store.dispatch('tickets/fetchTotalRevenueByType');
});

const ticketCount = computed(() => store.getters['tickets/ticketCount']); // Utilisation de computed pour réagir aux changements
// 


const ticketsByType = computed(() => store.getters['tickets/ticketsByType']);
const totalRevenueByType = computed(() => store.getters['tickets/totalRevenueByType']);

const totalRevenue = computed(() => {
  return totalRevenueByType.value.reduce((total, item) => total + item.total_revenue, 0);
});

const allTicketsValide = computed(() => store.getters['tickets/allTickets'].filter(ticket => ticket.statut === 'valide'));
const allTicketsEspire = computed(() => store.getters['tickets/allTickets'].filter(ticket => ticket.statut === 'expire'));

</script>

<template>
  <VRow>
    <VCol cols="12" md="3" v-for="revenue in totalRevenueByType" :key="revenue.type_name">
        <CardStatisticsVertical
          :title=" ' Revenue des tickets ' +revenue.type_name+ ':'"
          icon="mdi-currency-usd"
          :image="ticketIcon"
          :stats="revenue.total_revenue +' CFA'"
          :change="revenue.total_revenue / totalRevenue * 100"
        />
      </VCol>
      <!-- <VCol cols="12" md="3" v-for="ticket in ticketsByType" :key="ticket.type_name">
        <CardStatisticsVertical
          :title="ticket.type_name"
          icon="mdi-ticket"
          :image="ticketIcon"
          :stats="ticket.count"
          :change="ticket.count / ticketCount * 100"
        />
      </VCol> -->
      <VCol cols="12" md="3">
        <CardStatisticsVertical
          title="Nbre de tickets Valide"
          icon="mdi-check-circle-outline"
           :image="ticketIcon"
          :stats="allTicketsValide.length"
        />
      </VCol>
      <VCol cols="12" md="3">
        <CardStatisticsVertical
          title="Nbre de tickets Espire"
          icon="mdi-check-circle-outline"
           :image="ticketIcon"
          :stats="allTicketsEspire.length"
        />
      </VCol>
</VRow>

      <!-- allTicketsEspire -->
      
</template>

<style lang="scss">

</style>
