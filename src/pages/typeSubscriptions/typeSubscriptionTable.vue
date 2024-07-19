<!-- src/views/pages/typeSubscriptionTable.vue -->
<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('typeSubscriptions/fetchTypeSubscriptions');
});

const allTypeSubscriptions = computed(() => store.getters['typeSubscriptions/allTypeSubscriptions']);
const errorMessage = computed(() => store.getters['typeSubscriptions/errorMessage']);

const showTypeSubscription = (typeSubscriptionId) => {
  router.push({ name: 'typeSubcription-show', params: { id: typeSubscriptionId } });
};
// typeSubscription-edit
const updateTypeSubscription = (typeSubscriptionId) => {
  router.push({ name: 'typeSubscription-edit', params: { id: typeSubscriptionId } });
};

const deleteTypeSubscription = async (typeSubscriptionId) => {
  try {
    await store.dispatch('typeSubscriptions/deleteTypeSubscription', typeSubscriptionId);
    store.dispatch('typeSubscriptions/fetchTypeSubscriptions'); // Refresh the typeSubscription list after deletion
  } catch (error) {
    console.error('Error deleting typeSubscription:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="typeSubscription List">
        <VCardText>
          <VAlert v-if="errorMessage" type="error">
            {{ errorMessage }}
          </VAlert>
          <VTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="typeSubscription in allTypeSubscriptions" :key="typeSubscription.id">
                <td>{{ typeSubscription.id }}</td>
                <td>{{ typeSubscription.name }}</td>
                <td>{{ typeSubscription.price }}</td>
                <td>
                  <VBtn @click="showTypeSubscription(typeSubscription.id)" color="primary" small>Show</VBtn>
                  <VBtn @click="updateTypeSubscription(typeSubscription.id)" color="warning" small>Update</VBtn>
                  <VBtn @click="deleteTypeSubscription(typeSubscription.id)" color="error" small>Delete</VBtn>
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
      title: 'Add typeSubscription',
      icon: 'bx-typeSubscription-plus',
      to: '/addtypeSubscription',
    }"
  />
 </template>
