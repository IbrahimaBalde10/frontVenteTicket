<script setup>
import { useRoute } from 'vue-router'

import transactionManagement from '../transactions/transactionManagement.vue'
import Statistique from '../transactions/Statistique.vue';
import Graphes from '../transactions/Graphes.vue';


const route = useRoute()
const activeTab = ref(route.params.tab)

// Définition des onglets
const tabs = [
  {
    title: 'Transactions',
    icon: 'bx-user',
    tab: 'transactionManagement',
  },
  {
    title: 'Statistique',
    icon: 'bx-user',
    tab: 'Statistique',
  },
   {
    title: 'Graphes',
    icon: 'bx-user',
    tab: 'Graphes',
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
      <VWindowItem value="transactionManagement">
        <transactionManagement />
      </VWindowItem>

      <!-- Statistique -->
      <VWindowItem value="Statistique">
        <Statistique />
      </VWindowItem>

     <!-- ComptableManagement -->
      <VWindowItem value="Graphes">
        <Graphes />
      </VWindowItem>
    </VWindow>
  </div>
</template>

