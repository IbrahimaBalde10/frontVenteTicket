<script setup>
import { useRoute } from 'vue-router'

// import TypeTicketManagement from '../typeTickets/typeTicketsManagement.vue';
import TicketManagement from './specificites/TicketManagement.vue';
// import DashboardManagement from './specificites/Dashboard.vue';
import DashboardManagement from '@/pages/typeTickets/specificites/Dashboard.vue';
import statistique from '../typeTickets/specificites/CardStatisticsVertical.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

// Définition des onglets
const tabs = [
  // {
  //   title: 'Types de tickets',
  //   icon: 'bx-user',
  //   tab: 'TypeTicketManagement',
  // },
  {
    title: 'Tickets',
    icon: 'bx-user',
    tab: 'TicketManagement',
  },
   {
    title: 'Dashboards',
    icon: 'bx-user',
    tab: 'DashboardManagement',
  },
   {
    title: 'statistique',
    icon: 'bx-user',
    tab: 'statistique',
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
      <!-- TypeTicketManagement -->
      <!-- <VWindowItem value="TypeTicketManagement">
        <TypeTicketManagement />
      </VWindowItem> -->

      <!-- TicketManagement -->
      <VWindowItem value="TicketManagement">
        <TicketManagement />
      </VWindowItem>

     <!-- DashboardManagement -->
      <VWindowItem value="DashboardManagement">
        <DashboardManagement />
      </VWindowItem>

       <!-- VendeurManagement -->
      <VWindowItem value="statistique">
        <statistique />
      </VWindowItem>

       <!-- ClientManagement -->
      <VWindowItem value="clientManagement">
        <ClientManagement />
      </VWindowItem>
    </VWindow>
  </div>
</template>

