<script setup>
import { useRoute } from 'vue-router'
import AccountSettingsAccount from '@/pages/users/FormProfile.vue'

const route = useRoute()
const activeTab = ref(route.params.tab)

// Définition des onglets
const tabs = [
  {
    title: 'Account',
    icon: 'bx-user',
    tab: 'account',
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
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount />
      </VWindowItem>

    </VWindow>
  </div>
</template>

