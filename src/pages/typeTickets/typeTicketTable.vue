<!-- src/views/pages/typeTicketTable.vue -->
<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('typeTickets/fetchTypeTickets');
});

const alltypeTickets = computed(() => store.getters['typeTickets/alltypeTickets']);
const errorMessage = computed(() => store.getters['typeTickets/errorMessage']);

const showtypeTicket = (typeTicketId) => {
  router.push({ name: 'typeTicket-show', params: { id: typeTicketId } });
};

const updatetypeTicket = (typeTicketId) => {
  router.push({ name: 'typeTicket-edit', params: { id: typeTicketId } });
};

const deletetypeTicket = async (typeTicketId) => {
  try {
    await store.dispatch('typeTickets/deletetypeTicket', typeTicketId);
    store.dispatch('typeTickets/fetchTypeTickets'); // Refresh the typeTicket list after deletion
  } catch (error) {
    console.error('Error deleting typeTicket:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Types de tickets">
        <VCardText>
          <VAlert v-if="errorMessage" type="error">
            {{ errorMessage }}
          </VAlert>
          <VTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="typeTicket in alltypeTickets" :key="typeTicket.id">
                <td>{{ typeTicket.id }}</td>
                <td>{{ typeTicket.name }}</td>
                <td>{{ typeTicket.price }}</td>
                <td>
                  <VIcon @click="updatetypeTicket(typeTicket.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                  <VIcon @click="deletetypeTicket(typeTicket.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VerticalNavLink
    color="success"
    :item="{
      title: 'Add typeTicket',
      icon: 'bx-typeTicket-plus',
      to: '/addtypeTicket',
    }"
  />
</template>
