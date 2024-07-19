<script setup>
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const store = useStore();

onMounted(() => {
  store.dispatch('transactions/fetchTransactionSummary');
  store.dispatch('transactions/fetchTransactionsByType');
  store.dispatch('transactions/fetchTotalTransactionsByType');
});

const totalTransactions = computed(() => store.getters['transactions/totalTransactions']);
const totalAmount = computed(() => store.getters['transactions/totalAmount']);
const transactionsByType = computed(() => store.getters['transactions/transactionsByType']);
const totalTransactionsByType = computed(() => store.getters['transactions/totalTransactionsByType']);
</script>

<template>
  <div>
    <h3>Résumé Général des Transactions</h3>
    <p>Total des transactions : {{ totalTransactions }}</p>
    <p>Montant total des transactions : {{ totalAmount }} CFA</p>

    <h3>Détails par Type de Transaction</h3>
    <h4>Nombre de Transactions par Type</h4>
    <ul>
      <li v-for="transaction in transactionsByType" :key="transaction.transaction_name">
        {{ transaction.transaction_name }} : {{ transaction.count }}
      </li>
    </ul>

    <h4>Montant Total des Transactions par Type</h4>
    <ul>
      <li v-for="transaction in totalTransactionsByType" :key="transaction.transaction_name">
        {{ transaction.transaction_name }} : {{ transaction.total_amount }} CFA
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
