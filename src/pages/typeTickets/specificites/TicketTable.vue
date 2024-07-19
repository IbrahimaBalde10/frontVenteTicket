<!-- src/views/pages/ticketTable.vue -->
<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('tickets/fetchTickets');
});

const allTickets = computed(() => store.getters['tickets/allTickets']);

const deleteTicket = async (ticketId) => {
  try {
    await store.dispatch('tickets/deleteTicket', ticketId);
    store.dispatch('tickets/fetchTickets'); // Refresh the ticket list after deletion
  } catch (error) {
    console.error('Error deleting ticket:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Tickets">
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction</th>
                <th>Type</th>
                <th>Price</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in allTickets" :key="ticket.id">
                <td>{{ ticket.id }}</td>
                <td>{{ ticket.transaction_id }}</td>
                <td>{{ ticket.name }}</td>

                <td>{{ ticket.type_price }}</td>
                <td>{{ ticket.statut }}</td>
                <td>
                
                  <VIcon @click="deleteTicket(ticket.id)" color="error" small>mdi-delete</VIcon>
               
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
