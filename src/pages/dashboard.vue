<script setup>
// liste des composants affichés sur le dashboard
import Welcome from '@/pages/auth/welcom.vue'
// import Revenu from '@/pages/transactions/Graphes.vue'
import Revenu from '@/pages/transactions/Revenue.vue'

// myImages
import userIcon from '@images/myImages/user.png'
import transactionIcon from '@images/myImages/transaction.png'
import ticketIcon from '@images/myImages/ticket.png'
import subscriptionIcon from '@images/myImages/subscription.png'
// essai
import Recherche from '@/pages/recherche/SearchResults.vue'

// utisation de store

import { useStore } from 'vuex';
// const icon = 'bx-log-in';
const store = useStore();
onMounted(() => {
  store.dispatch('users/fetchUsers');
  store.dispatch('transactions/fetchtransactions');
  store.dispatch('tickets/fetchTickets');
  store.dispatch('subscriptions/fetchSubscriptions');
});

const userCount = computed(() => store.getters['users/userCount']); // Utilisation de computed pour réagir aux changements
const transactionCount = computed(() => store.getters['transactions/transactionCount']); // Utilisation de computed pour réagir aux changements
const ticketCount = computed(() => store.getters['tickets/ticketCount']); // Utilisation de computed pour réagir aux changements
const subscriptionCount = computed(() => store.getters['subscriptions/subscriptionCount']); // Utilisation de computed pour réagir aux changements



</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="8">  
    <!-- <p>Users: {{userCount}}</p>,  <p>Transactions: {{transactionCount}}</p> -->
    <!-- <p>Tickets: {{ticketCount}}</p> -->
    <!-- <p>Subscriptions: {{subscriptionCount}}</p> -->
      <Welcome />
    </VCol>

    <VCol cols="12" sm="4">
      <VRow>
        <!-- 👉 Users -->
      <VCol cols="12" md="6">
      <CardStatisticsVertical
      :title="'Utilisateurs'"
      :image="userIcon"
      :change="userCount%100"
      :stats="userCount"
      :to="{ name: 'userManagement'}"
    />
  </VCol>
  <!-- 👉 Tickets -->
  <VCol cols="12" md="6">
    <CardStatisticsVertical
      :title="'Tickets'"
      :image="ticketIcon"
      :change="ticketCount%100"
      :stats="ticketCount"
      :to="{ name: 'typeTicketsManagement' }"
    />
  </VCol>
</VRow>
    </VCol>

    <!-- 👉 Total Revenue -->
    <VCol cols="12" md="8" order="2" order-md="1" >
      <!-- <AnalyticsTotalRevenue /> -->
      <!-- <Recherche /> -->
      <Revenu />
    </VCol>

    <VCol
      cols="12"
      sm="8"
      md="4"
      order="1"
      order-md="2"
    >
      <VRow>
        <!-- 👉 Abonnement -->
        <VCol  cols="12" sm="6">
          <CardStatisticsVertical
           :title="'Abonements'"
          :image="subscriptionIcon"
          :change="subscriptionCount%100"
          :stats="subscriptionCount"
          :to="{ name: 'typeSubscriptionsManagement' }"
          />
        </VCol>

     
   <!-- 👉 Transactions -->
  <VCol cols="12" sm="6">
    <CardStatisticsVertical
      :title="'Ventes'"
      :image="transactionIcon"
      :change="transactionCount%100"
      :stats="transactionCount"
      :to="{ name: 'transcation' }"
    />
  </VCol> 
  
 
   <!-- 👉 Recherche -->
  <VCol cols="12" sm="9">
    <!-- <Recherche /> -->
  </VCol>
</VRow>

      <VRow>
        <!-- 👉 Profit Report -->
        <VCol
          cols="12"
          sm="12"
        >
          <!-- <AnalyticsProfitReport /> -->
        </VCol>
      </VRow>
    </VCol>

  </VRow>
</template>
