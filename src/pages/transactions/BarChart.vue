<template>
  <div>
    <h3>Nombre de Transactions par Type</h3>
    <Bar :data="transactionsByTypeData" :options="chartOptions" />

    <h3>Montant Total des Transactions par Type</h3>
    <Bar :data="totalTransactionsByTypeData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Enregistrement des composants et des plugins
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useStore();

onMounted(() => {
  store.dispatch('transactions/fetchTransactionSummary');
  store.dispatch('transactions/fetchTransactionsByType');
  store.dispatch('transactions/fetchTotalTransactionsByType');
});

const transactionsByType = computed(() => store.getters['transactions/transactionsByType']);
const totalTransactionsByType = computed(() => store.getters['transactions/totalTransactionsByType']);

// Préparer les données pour les graphiques
const transactionsByTypeData = computed(() => {
  const labels = transactionsByType.value.map(t => t.transaction_name);
  const data = transactionsByType.value.map(t => t.count);

  return {
    labels,
    datasets: [
      {
        label: 'Nombre de Transactions',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
});

const totalTransactionsByTypeData = computed(() => {
  const labels = totalTransactionsByType.value.map(t => t.transaction_name);
  const data = totalTransactionsByType.value.map(t => t.total_amount);

  return {
    labels,
    datasets: [
      {
        label: 'Montant Total des Transactions',
        data,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} CFA`,
      },
    },
  },
};
</script>
