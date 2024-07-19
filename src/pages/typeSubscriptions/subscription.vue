<script setup>
import { useRoute } from 'vue-router'

import TypeSubscriptionManagement from '../typeSubscriptions/typeSubscriptionsManagement.vue';
import SubscriptionManagement from './specificites/SubscriptionManagement.vue';
import DashboardManagement from './specificites/Dashboard.vue';
// import DashboardManagement from '@/pages/typeSubscriptions/specificites/Dashboard.vue';
import CardStatisticsVertical from '../typeSubscriptions/specificites/CardStatisticsVertical.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

// Définition des onglets
const tabs = [
  {
    title: 'Types de Subscriptions',
    icon: 'bx-user',
    tab: 'TypeSubscriptionManagement',
  },
  {
    title: 'Subscriptions',
    icon: 'bx-user',
    tab: 'SubscriptionManagement',
  },
   {
    title: 'Dashboards',
    icon: 'bx-user',
    tab: 'DashboardManagement',
  },
   {
    title: 'Statistiques',
    icon: 'bx-user',
    tab: 'CardStatisticsVertical',
  },

]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- TypeSubscriptionManagement -->
      <VWindowItem value="TypeSubscriptionManagement">
        <TypeSubscriptionManagement />
      </VWindowItem>

      <!-- SubscriptionManagement -->
      <VWindowItem value="SubscriptionManagement">
        <SubscriptionManagement />
      </VWindowItem>

     <!-- DashboardManagement -->
      <VWindowItem value="DashboardManagement">
        <DashboardManagement />
      </VWindowItem>

       <!-- CardStatisticsVertical -->
      <VWindowItem value="CardStatisticsVertical">
        <CardStatisticsVertical />
      </VWindowItem>
    </VWindow>
  </div>
</template>

