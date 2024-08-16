<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TicketDetail from '../specificites/ticket_Show.vue'; // Assurez-vous que le chemin est correct


const store = useStore();
const router = useRouter();

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
});

const dialog = ref({
  show: false,
  ticketId: null,
});

const showTicketDetailDialog = ref(false);
const selectedTicketId = ref(null);

const currentPage = ref(1);

onMounted(() => {
  store.dispatch('tickets/fetchTickets', { page: currentPage.value, perPage: 5 });
});

const allTickets = computed(() => store.getters['tickets/allTickets']);
const totalPages = computed(() => Math.ceil(store.getters['tickets/totalTickets'] / store.getters['tickets/perPage']));

const paginatedTickets = computed(() => {
  const start = (currentPage.value - 1) * store.getters['tickets/perPage'];
  const end = start + store.getters['tickets/perPage'];
  return allTickets.value.slice(start, end);
});


const showTicketDetails = (ticketId) => {
  selectedTicketId.value = ticketId;
  showTicketDetailDialog.value = true;
};

const confirmDelete = (ticketId) => {
  dialog.value = {
    show: true,
    ticketId: ticketId,
  };
};

const deleteTicket = async () => {
  try {
    await store.dispatch('tickets/deleteTicket', dialog.value.ticketId);
    store.dispatch('tickets/fetchTickets', { page: currentPage.value, perPage: store.getters['tickets/perPage'] });
    dialog.value.show = false;
    snackbar.value = {
      show: true,
      text: 'Ticket supprimé avec succès',
      color: 'success',
    };
  } catch (error) {
    console.error('Failed to delete ticket:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de la suppression du ticket',
      color: 'error',
    };
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Liste des Tickets">
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Propriétaire</th>
                <!-- <th class="text-center">Trajet</th> -->
                <th class="text-center">Transaction</th>
                <th class="text-center">Type</th>
                <th class="text-center">Statut</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="ticket in paginatedTickets" :key="ticket.id">
                <td>{{ ticket.id }}</td>
                <td>{{ ticket.nom }}</td>
                <td>{{ ticket.transaction_id }}</td>
                <td>{{ ticket.type }}</td>
                <td>{{ ticket.statut }}</td>
                <td>
                  <VIcon @click="showTicketDetails(ticket.id)" class="ms-2" color="primary" small>mdi-eye</VIcon>
                  <VIcon @click="confirmDelete(ticket.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="(page) => store.dispatch('tickets/fetchTickets', { page, perPage: store.getters['tickets/perPage'] })"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer la Suppression</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer ce ticket ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deleteTicket" color="error">Supprimer</VBtn>
        <VBtn @click="() => dialog.show = false">Annuler</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VSnackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :multi-line="true" :vertical="true">
    {{ snackbar.text }}
  </VSnackbar>

  <!-- Include ticket details dialog here -->
  <ticketDetail :ticketId="selectedTicketId" v-model:show="showTicketDetailDialog" />
</template>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
