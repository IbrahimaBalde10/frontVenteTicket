<script setup>
import { useRoute } from 'vue-router'

import UserManagement from '../users/UserManagement.vue'
import AdminManagement from '../users/rolesTypes/AdminManagement.vue';
import ComptableManagement from '../users/rolesTypes/ComptableManagement.vue'
import VendeurManagement from '../users/rolesTypes/VendeurManagement.vue';
import ClientManagement from '../users/rolesTypes/ClientManagement.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

// Définition des onglets
const tabs = [
  {
    title: 'Users',
    icon: 'bx-user',
    tab: 'userManagement',
  },
  {
    title: 'Admins',
    icon: 'bx-user',
    tab: 'adminManagement',
  },
   {
    title: 'Comptables',
    icon: 'bx-user',
    tab: 'comptableManagement',
  },
  {
    title: 'Vendeurs',
    icon: 'bx-user',
    tab: 'vendeurManagement',
  },
   {
    title: 'Clients',
    icon: 'bx-user',
    tab: 'clientManagement',
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
      <!-- userManagement -->
      <VWindowItem value="userManagement">
        <UserManagement />
      </VWindowItem>

      <!-- adminManagement -->
      <VWindowItem value="adminManagement">
        <AdminManagement />
      </VWindowItem>

     <!-- ComptableManagement -->
      <VWindowItem value="comptableManagement">
        <ComptableManagement />
      </VWindowItem>

       <!-- VendeurManagement -->
      <VWindowItem value="vendeurManagement">
        <VendeurManagement />
      </VWindowItem>

       <!-- ClientManagement -->
      <VWindowItem value="clientManagement">
        <ClientManagement />
      </VWindowItem>
    </VWindow>
  </div>
</template>

