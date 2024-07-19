<script lang="ts" setup>
// myImages
import subscriptionIcon from '@images/myImages/subscription.png'
// utisation de store

import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';
// const icon = 'bx-log-in';
const store = useStore();
onMounted(() => {
  // store.dispatch('users/fetchUsers');
  // store.dispatch('transactions/fetchTransactions');
  store.dispatch('subscriptions/fetchsubscriptions');
  // fetchsubscriptions
  store.dispatch('subscriptions/fetchsubscriptionsByType');
  store.dispatch('subscriptions/fetchTotalRevenueByType');
});

// const userCount = computed(() => store.getters['users/userCount']); // Utilisation de computed pour réagir aux changements
// const transactionCount = computed(() => store.getters['transactions/transactionCount']); // Utilisation de computed pour réagir aux changements
const subscriptionCount = computed(() => store.getters['subscriptions/subscriptionCount']); // Utilisation de computed pour réagir aux changements
// 


const subscriptionsByType = computed(() => store.getters['subscriptions/subscriptionsByType']);
const totalRevenueByType = computed(() => store.getters['subscriptions/totalRevenueByType']);

const totalRevenue = computed(() => {
  return totalRevenueByType.value.reduce((total, item) => total + item.total_revenue, 0);
});

const allSubscriptionsValide = computed(() => store.getters['subscriptions/allSubscriptions'].filter(subscription => subscription.statut === 'valide'));
const allSubscriptionsEspire = computed(() => store.getters['subscriptions/allSubscriptions'].filter(subscription => subscription.statut === 'expire'));

</script>

<template>
  <VRow>
    <VCol cols="12" md="3" v-for="revenue in totalRevenueByType" :key="revenue.type_name">
        <CardStatisticsVertical
          :title="revenue.type_name + ' Revenue'"
          icon="mdi-currency-usd"
          :image="subscriptionIcon"
          :stats="revenue.total_revenue +' CFA'"
          :change="revenue.total_revenue / totalRevenue * 100"
        />
      </VCol>
      <VCol cols="12" md="3" v-for="subscription in subscriptionsByType" :key="subscription.type_name">
        <CardStatisticsVertical
          :title="subscription.type_name"
          icon="mdi-subscription"
          :image="subscriptionIcon"
          :stats="subscription.count"
          :change="subscription.count / subscriptionCount * 100"
        />
      </VCol>
      <VCol cols="12" md="3">
        <CardStatisticsVertical
          title="subscriptions Valide"
          icon="mdi-check-circle-outline"
           :image="subscriptionIcon"
          :stats="allSubscriptionsValide.length"
        />
      </VCol>
      <VCol cols="12" md="3">
        <CardStatisticsVertical
          title="subscriptions Espire"
          icon="mdi-check-circle-outline"
          :image="subscriptionIcon"
          :stats="allSubscriptionsEspire.length"
        />
      </VCol>
</VRow>

      <!-- allSubscriptionsEspire -->
      
</template>

<style lang="scss">

</style>
