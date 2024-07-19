<!-- src/views/pages/subscriptionTable.vue -->
<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('subscriptions/fetchSubscriptions');
});

const allSubscriptions = computed(() => store.getters['subscriptions/allSubscriptions']);

const deleteSubscription = async (subscriptionId) => {
  try {
    await store.dispatch('subscriptions/deleteSubscription', subscriptionId);
    store.dispatch('subscriptions/fetchSubscriptions'); // Refresh the subscription list after deletion
  } catch (error) {
    console.error('Error deleting subscription:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="subscriptions">
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
              <tr v-for="subscription in allSubscriptions" :key="subscription.id">
                <td>{{ subscription.id }}</td>
                <td>{{ subscription.transaction_id }}</td>
                <td>{{ subscription.name }}</td>

                <td>{{ subscription.type_price }}</td>
                <td>{{ subscription.statut }}</td>
                <td>
                
                  <VIcon @click="deleteSubscription(subscription.id)" color="error" small>mdi-delete</VIcon>
               
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
