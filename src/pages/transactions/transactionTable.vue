<!-- src/views/pages/TransactionTable.vue -->
<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('transactions/fetchTransactions');
});

const allTransactions = computed(() => store.getters['transactions/allTransactions']);
const errorMessage = computed(() => store.getters['transactions/errorMessage']);


const deleteTransaction = async (transactionId) => {
  try {
    await store.dispatch('transactions/deleteTransaction', transactionId);
    store.dispatch('transactions/fetchTransactions'); // Refresh the Transaction list after deletion
    router.push({ name: 'transcation' });
  } catch (error) {
    console.error('Error deleting Transaction:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Transaction List">
        <VCardText>
          <VAlert v-if="errorMessage" type="error">
            {{ errorMessage }}
          </VAlert>
          <VTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>transaction_name</th>
                <th>Total amoun</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="Transaction in allTransactions" :key="Transaction.id">
                <td>{{ Transaction.id }}</td>
                <td>{{ Transaction.transaction_name }}</td>
                <td>{{ Transaction.total_amount }}</td>
                <td>
                  <VBtn @click="showTransaction(Transaction.id)" color="primary" small>Show</VBtn>
                  <VBtn @click="updateTransaction(Transaction.id)" color="warning" small>Update</VBtn>
                  <VBtn @click="deleteTransaction(Transaction.id)" color="error" small>Delete</VBtn>
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
      title: 'Add Transaction',
      icon: 'bx-Transaction-plus',
      to: '/addTransaction',
    }"
  />
</template>
