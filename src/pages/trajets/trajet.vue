<script setup>
import { useRoute } from 'vue-router'

import TrajetManagement from '../trajets/TrajetManagement.vue'
// import AdminManagement from '../users/rolesTypes/AdminManagement.vue';
// import ComptableManagement from '../users/rolesTypes/ComptableManagement.vue'
// import VendeurManagement from '../users/rolesTypes/VendeurManagement.vue';
// import ClientManagement from '../users/rolesTypes/ClientManagement.vue'
// import ActiveManagement from './rolesTypes/ActiveManagement.vue'
// import DesactiveManagement from './rolesTypes/DesactiveManagement.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

// Définition des onglets 
const tabs = [
  {
    title: 'Trajets',
    icon: 'bx-user',
    tab: 'trajetManagement',
  },
  // {
  //   title: 'Admins',
  //   icon: 'bx-user',
  //   tab: 'adminManagement',
  // },
  //  {
  //   title: 'Comptables',
  //   icon: 'bx-user',
  //   tab: 'comptableManagement',
  // },
  // {
  //   title: 'Vendeurs',
  //   icon: 'bx-user',
  //   tab: 'vendeurManagement',
  // },
  //  {
  //   title: 'Clients',
  //   icon: 'bx-user',
  //   tab: 'clientManagement',
  // },
  //   {
  //   title: 'Actifs',
  //   icon: 'bx-user',
  //   tab: 'activeManagement',
  // },
  //   {
  //   title: 'Inactifs',
  //   icon: 'bx-user',
  //   tab: 'desactiveManagement',
  // },
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
      <!-- trajetManagement -->
      <VWindowItem value="trajetManagement">
        <TrajetManagement />
      </VWindowItem>
    </VWindow>
  </div>
</template>

