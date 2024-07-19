<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('transactions/fetchTransactionSummary')
  store.dispatch('transactions/fetchTransactionsByType')
  store.dispatch('transactions/fetchTotalTransactionsByType')
})

const totalTransactions = computed(() => store.getters['transactions/totalTransactions'])
const totalAmount = computed(() => store.getters['transactions/totalAmount'])
const transactionsByType = computed(() => store.getters['transactions/transactionsByType'])
const totalTransactionsByType = computed(() => store.getters['transactions/totalTransactionsByType'])

const transactionsByTypeChartData = computed(() => {
  const labels = transactionsByType.value.map(transaction => transaction.transaction_name)
  const data = transactionsByType.value.map(transaction => transaction.count)
  return {
    labels,
    datasets: [
      {
        label: 'Nombre de Transactions par Type',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        data,
      },
    ],
  }
})

const totalTransactionsByTypeChartData = computed(() => {
  const labels = totalTransactionsByType.value.map(transaction => transaction.transaction_name)
  const data = totalTransactionsByType.value.map(transaction => transaction.total_amount)
  return {
    labels,
    datasets: [
      {
        label: 'Montant Total des Transactions par Type',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        data,
      },
    ],
  }
})
</script>

<template>
  <div>
    <h3>Résumé Général des Transactions</h3>
    <p>Total des transactions : {{ totalTransactions }}</p>
    <p>Montant total des transactions : {{ totalAmount }} CFA</p>

    <h3>Détails par Type de Transaction</h3>
    <h4>Nombre de Transactions par Type</h4>
    <pie-chart :chart-data="transactionsByTypeChartData" />

    <h4>Montant Total des Transactions par Type</h4>
    <bar-chart :chart-data="totalTransactionsByTypeChartData" />
  </div>
</template>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
