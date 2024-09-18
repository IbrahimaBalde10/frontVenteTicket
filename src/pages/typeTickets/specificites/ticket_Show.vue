<template>
  <VDialog :model-value="show" @update:model-value="updateShow" max-width="820px">
    <VCard v-if="ticket">
      <VCardTitle class="headline">Détails du Ticket</VCardTitle>
      <VCardText>
        <div class="ticket-details">
          <div class="details-column">
            <h3>Informations sur le Ticket</h3>
            <!--  -->
            <p><strong>ID Ticket:</strong> {{ ticket.id }}</p>
            <p><strong>Type:</strong> {{ ticket.type }}</p>
            <p><strong>Utilisateur:</strong> {{ ticket.nom }}</p>
            <p><strong>Trajet:</strong> {{ ticket.trajet ? ticket.trajet.nom : 'N/A' }}</p>
            <p><strong>Prix du trajet: </strong>{{ticket.trajet ?  Number(ticket.trajet.prix).toLocaleString('fr-FR', {minimumFractionDigits: 0}):  'N/A' }} CFA</p>
            <!-- <p><strong>Montant du trajet:</strong> {{ ticket.trajet ? ticket.trajet.prix : 'N/A' }} CFA</p> -->
            <!-- <p><strong>Montant du ticket: </strong> ({{ ticket.trajet ? ticket.trajet.prix : 'N/A' }}*2) CFA</p> -->
            <p><strong>Arrivée:</strong> {{ ticket.trajet ? ticket.trajet.point_arrivee : 'N/A' }}</p>
            <p><strong>Statut:</strong> {{ ticket.statut }}</p>
            <p><strong>QR_Code:</strong> {{ ticket.qr_code }}</p>
            <p><strong>Date d'Expiration:</strong> {{ new Date(ticket.expiration_date).toLocaleString() }}</p>
          </div>
        </div>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="closeDialog">Fermer</VBtn>
      </VCardActions>
    </VCard>
    <VCard v-else>
      <VCardText>Chargement des détails du ticket...</VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const show = ref(false);
const ticket = ref(null);

const updateShow = (value) => {
  show.value = value;
};

const closeDialog = () => {
  show.value = false;
};

const props = defineProps(['ticketId']);

watch(
  () => props.ticketId,
  async (newId) => {
    if (newId) {
      try {
        console.log('Fetching ticket details for ID:', newId); // Debugging line
        ticket.value = await store.dispatch('tickets/fetchTicketById', newId);
        console.log('Fetched ticket data:', ticket.value); // Debugging line
        show.value = true;
      } catch (error) {
        console.error('Failed to fetch ticket:', error);
      }
    }
  }
);


</script>

<style scoped>
.ticket-details {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.details-column {
  flex: 1;
}

h3 {
  color: #1976d2;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}

strong {
  color: #333;
  font-weight: bold;
}

p strong {
  color: #000;
}

p {
  color: #555;
}
</style>
