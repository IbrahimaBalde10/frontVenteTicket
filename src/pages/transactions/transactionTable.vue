<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Liste des transactions">
        <VCardText >
          <VTable>
            <thead>
              <tr>
                <th class="text-center">Identifiant</th>
                <th class="text-center">Effectuer par</th>
                 <th class="text-center">Client</th>
                <th class="text-center">Prix</th>
                <th class="text-center">Total</th>
                <th class="text-center">Type</th>
                <th class="text-center">M Paiement</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in paginatedtransactions" :key="transaction.id">
                <td class="text-center">{{ transaction.id }}</td>
                <td class="text-center">{{ transaction.user ? transaction.user.nom : 'N/A' }}
                  {{ transaction.user ? transaction.user.prenom : 'N/A' }}
                </td>
                <td class="text-center">{{ transaction.client ? transaction.client.nom : 'N/A' }}
                  {{transaction.client ? transaction.client.prenom : 'N/A' }}
                </td>

                <td class="text-center">{{ transaction.price }}</td>
                <!-- <td class="text-center">{{ transaction.quantity }}</td> -->
                <td class="text-center">{{ transaction.total_amount }}</td>
                <td class="text-center">{{ transaction.transaction_name }}</td>
                <td class="text-center">{{ transaction.methodePaiement }}</td>
                <td class="text-center">
                  <VIcon @click="showtransactionDetails(transaction.id)" class="ms-2" color="primary" small>mdi-eye</VIcon>
                  <VIcon @click="confirmDelete(transaction.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="(page) => store.dispatch('transactions/fetchtransactions', { page, perPage: store.getters['transactions/perPage'] })"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <transactionDetail :transactionId="selectedtransactionId" v-model:show="showtransactionDetailDialog" />

  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer la Suppression</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer ce transaction ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deletetransaction" color="error">Supprimer</VBtn>
        <VBtn @click="() => dialog.show = false">Annuler</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VSnackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :multi-line="true" :vertical="true">
    {{ snackbar.text }}
  </VSnackbar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import transactionDetail from './transaction_Show.vue'; // Assurez-vous que le chemin est correct

const store = useStore();
const router = useRouter();

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000
});

const dialog = ref({
  show: false,
  transactionId: null
});

const showtransactionDetailDialog = ref(false);
const selectedtransactionId = ref(null);

const currentPage = ref(1);

onMounted(() => {
  store.dispatch('transactions/fetchtransactions', { page: currentPage.value, perPage: 5 });
});

const alltransactions = computed(() => store.getters['transactions/alltransactions']);
const totalPages = computed(() => Math.ceil(store.getters['transactions/totaltransactions'] / store.getters['transactions/perPage']));

const paginatedtransactions = computed(() => {
  const start = (currentPage.value - 1) * store.getters['transactions/perPage'];
  const end = start + store.getters['transactions/perPage'];
  return alltransactions.value.slice(start, end);
});

const showtransactionDetails = (transactionId) => {
  selectedtransactionId.value = transactionId;
  showtransactionDetailDialog.value = true;
};


const confirmDelete = (transactionId) => {
  dialog.value = {
    show: true,
    transactionId: transactionId
  };
};

const deletetransaction = async () => {
  try {
    await store.dispatch('transactions/deletetransaction', dialog.value.transactionId);
    store.dispatch('transactions/fetchtransactions', { page: currentPage.value, perPage: store.getters['transactions/perPage'] });
    dialog.value.show = false;
    snackbar.value = {
      show: true,
      text: 'transaction supprimé avec succès',
      color: 'success'
    };
  } catch (error) {
    console.error('Failed to delete transaction:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de la suppression du transaction',
      color: 'error'
    };
  }
};
</script>

<style scoped>
.v-icon {
  cursor: pointer;
}
</style>
