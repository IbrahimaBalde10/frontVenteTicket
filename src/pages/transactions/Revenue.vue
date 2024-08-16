<template>
  <VCard>
    <VCardText class="pb-1">
      <h6 class="text-base font-weight-regular">
         Total Revenue
      </h6>
      <h5 class="text-h5 font-weight-medium">
         {{ totalAmount }} CFA
      </h5>
    </VCardText>

    <VueApexCharts
      type="bar"
      :height="300"
      :options="chartOptions"
      :series="series"
    />
  </VCard>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';
import { hexToRgb } from '@layouts/utils'; // Assurez-vous que cette fonction est correctement importée

const store = useStore();
const vuetifyTheme = useTheme();

const dailyRevenues = computed(() => store.getters['transactions/dailyRevenues']);
const totalRevenue = computed(() => dailyRevenues.value.reduce((acc, curr) => acc + curr.total_revenue, 0));
const totalAmount = computed(() => store.getters['transactions/totalAmount']);

// Fetch daily revenues on component mount
onMounted(() => {
  store.dispatch('transactions/fetchDailyRevenues');
  store.dispatch('transactions/fetchTransactionSummary');
});

// Series for the chart
const series = computed(() => [{
  data: dailyRevenues.value.map(revenue => revenue.total_revenue),
}]);

// Options for the chart
const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  const disabledText = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`;

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        distributed: true,
        columnWidth: '95%',
        endingShape: 'rounded',
        startingShape: 'rounded',
      },
    },
    legend: { show: false },
    tooltip: { 
      enabled: true,
      y: {
        formatter: (value) => `${value} CFA`,
        title: {
          formatter: (seriesName) => '',
        }
      },
    },
    dataLabels: { enabled: false },
    colors: [
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 0.16)`,
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 0.16)`,
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 0.16)`,
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 0.16)`,
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 1)`,
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 0.16)`,
      `rgba(${ hexToRgb(String(currentTheme.primary)) }, 0.16)`,
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    xaxis: {
      categories: dailyRevenues.value.map(revenue => revenue.date),
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          fontSize: '19px',
          colors: disabledText,
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: { 
      show: true, 
      labels: { 
        formatter: (value) => `${value} CFA` 
      } 
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        top: -10,
        right: 7,
        bottom: -3,
      },
    },
  };
});
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
