<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import UserManagement from '../users/UserManagement.vue'
import AdminManagement from '../users/rolesTypes/AdminManagement.vue'
import ComptableManagement from '../users/rolesTypes/ComptableManagement.vue'
import VendeurManagement from '../users/rolesTypes/VendeurManagement.vue'
import ClientManagement from '../users/rolesTypes/ClientManagement.vue'
import ActiveManagement from '../users/rolesTypes/ActiveManagement.vue'
import DesactiveManagement from '../users/rolesTypes/DesactiveManagement.vue'

const route = useRoute()
const activeTab = ref(route.params.tab || 'userManagement')

// Définition des onglets
const tabs = [
  {
    title: 'Utilisateurs',
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
  {
    title: 'Actifs',
    icon: 'bx-user',
    tab: 'activeManagement',
  },
  {
    title: 'Inactifs',
    icon: 'bx-user',
    tab: 'desactiveManagement',
  },
]
</script>

<template>
  <div>
    <!-- Recherche et sélection d'onglet -->
    <VAutocomplete
      v-model="activeTab"
      :items="tabs"
      item-title="title"
      item-value="tab"
      label="Rechercher et sélectionner une section"
    >
      <template v-slot:selection="{ item }">
        <VIcon :icon="item.icon" size="20" />
        {{ item.title }}
      </template>
    </VAutocomplete>
    
    <VDivider class="my-4" />

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

      <!-- ActiveManagement -->
      <VWindowItem value="activeManagement">
        <ActiveManagement />
      </VWindowItem>

      <!-- DesactiveManagement -->
      <VWindowItem value="desactiveManagement">
        <DesactiveManagement />
      </VWindowItem>
    </VWindow>
  </div>
</template>
