<template>
  <VDialog :model-value="show" @update:model-value="updateShow" max-width="820px">
    <VCard v-if="transaction">
      <VCardTitle class="headline">Détails de la Transaction</VCardTitle>
      <VCardText>
        <div class="transaction-details">
          <div class="details-column">
            <h3>Détails de la Transaction</h3>
            <p><strong>ID Transaction:</strong> {{ transaction.id }}</p>
            <p><strong>Type:</strong> {{ transaction.transaction_name }}</p>
            <template v-if="transaction.transaction_name !== 'subscription'">
              <p><strong>Quantité:</strong> {{ transaction.quantity }}</p>
              <p><strong>Prix unitaire:</strong> {{ transaction.price }}</p>
            </template>
            <p><strong>Montant totale payé:</strong> {{ transaction.total_amount }}</p>
            <p><strong>Methode de Paiement:</strong> {{ transaction.methodePaiement }}</p>
            <p><strong>Date:</strong> {{ new Date(transaction.created_at).toLocaleString() }}</p>
          </div>
          <div class="details-column">
            <h3>Réalisée</h3>
            <p><strong>Par: </strong> {{ transaction.user.prenom }} {{ transaction.user.nom }}</p>
            <p><strong>Role:</strong> {{ transaction.user.role }}</p>
            <p><strong>Email:</strong> {{ transaction.user.email }}</p>
          </div>
          <div class="details-column">
            <h3>Détails du Client</h3>
            <p><strong>Client:</strong> {{ transaction.client.prenom }} {{ transaction.client.nom }}</p>
            <p><strong>Role:</strong> {{ transaction.client.role }}</p>
            <p><strong>Email:</strong> {{ transaction.client.email }}</p>
          </div>
        </div>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="closeDialog">Fermer</VBtn>
      </VCardActions>
    </VCard>
    <VCard v-else>
      <VCardText>Chargement des détails de la transaction...</VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const show = ref(false);
const transaction = ref(null);

const updateShow = (value) => {
  show.value = value;
};

const closeDialog = () => {
  show.value = false;
};

const props = defineProps(['transactionId']);

watch(
  () => props.transactionId,
  async (newId) => {
    if (newId) {
      try {
        transaction.value = await store.dispatch('transactions/fetchtransactionById', newId);
        show.value = true;
      } catch (error) {
        console.error('Failed to fetch transaction:', error);
      }
    }
  }
);
</script>

<style scoped>
.transaction-details {
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
