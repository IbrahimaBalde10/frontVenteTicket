<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="9">
          <VCard class="text-2xl font-weight-bold p-4">
            <VCardTitle class="text-2xl font-weight-bold">Liste des subscriptionTypes</VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="3">
          <VBtn title="Ajouter un subscriptionType" color="primary" @click="() => router.push('/addsubscriptionType')">
            Ajouter un subscriptionType
          </VBtn>
        </VCol>
      </VRow>
      <VCard>
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th class="text-center">Identifiant</th>
                <th class="text-center">Nom</th>
                <th class="text-center">Description</th>
                <th class="text-center">Prix</th>
                <th class="text-center">Disponibilité</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subscriptionType in paginatedsubscriptionTypes" :key="subscriptionType.id">
                <td class="text-center">{{ subscriptionType.id }}</td>
                <td class="text-center">{{ subscriptionType.name }}</td>
                <td class="text-center">{{ subscriptionType.price }}</td>
                <td class="text-center">{{ subscriptionType.statut }}</td>
                <td class="text-center">
                  <VIcon @click="showsubscriptionTypeDetails(subscriptionType.id)" class="ms-2" color="primary" small>mdi-eye</VIcon>
                  <VIcon @click="updatesubscriptionType(subscriptionType.id)" class="ms-2" color="warning" small>mdi-pencil</VIcon>
                  <VIcon @click="confirmDelete(subscriptionType.id)" color="error" small>mdi-delete</VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
          <VPagination
            v-model:page="currentPage"
            :length="totalPages"
            :total-visible="3"
            @update:page="(page) => store.dispatch('subscriptionTypes/fetchsubscriptionTypes', { page, perPage: store.getters['subscriptionTypes/perPage'] })"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <subscriptionTypeDetail :subscriptionTypeId="selectedsubscriptionTypeId" v-model:show="showsubscriptionTypeDetailDialog" />

  <VDialog v-model="dialog.show" max-width="500px">
    <VCard>
      <VCardTitle>
        <span class="headline">Confirmer la Suppression</span>
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer ce subscriptionType ?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="deletesubscriptionType" color="error">Supprimer</VBtn>
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
import subscriptionTypeDetail from './specificites/TypeSubscriptionShow.vue'; // Assurez-vous que le chemin est correct

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
  subscriptionTypeId: null
});

const showsubscriptionTypeDetailDialog = ref(false);
const selectedsubscriptionTypeId = ref(null);

const currentPage = ref(1);

onMounted(() => {
  store.dispatch('subscriptionTypes/fetchsubscriptionTypes', { page: currentPage.value, perPage: 5 });
});

const allsubscriptionTypes = computed(() => store.getters['subscriptionTypes/allsubscriptionTypes']);
const totalPages = computed(() => Math.ceil(store.getters['subscriptionTypes/totalsubscriptionTypes'] / store.getters['subscriptionTypes/perPage']));

const paginatedsubscriptionTypes = computed(() => {
  const start = (currentPage.value - 1) * store.getters['subscriptionTypes/perPage'];
  const end = start + store.getters['subscriptionTypes/perPage'];
  // return allsubscriptionTypes.value.slice(start, end);
});

const showsubscriptionTypeDetails = (subscriptionTypeId) => {
  selectedsubscriptionTypeId.value = subscriptionTypeId;
  showsubscriptionTypeDetailDialog.value = true;
};

const updatesubscriptionType = (subscriptionTypeId) => {
  router.push({ name: 'subscriptionType-edit', params: { id: subscriptionTypeId } });
};

const confirmDelete = (subscriptionTypeId) => {
  dialog.value = {
    show: true,
    subscriptionTypeId: subscriptionTypeId
  };
};

const deletesubscriptionType = async () => {
  try {
    await store.dispatch('subscriptionTypes/deletesubscriptionType', dialog.value.subscriptionTypeId);
    store.dispatch('subscriptionTypes/fetchsubscriptionTypes', { page: currentPage.value, perPage: store.getters['subscriptionTypes/perPage'] });
    dialog.value.show = false;
    snackbar.value = {
      show: true,
      text: 'subscriptionType supprimé avec succès',
      color: 'success'
    };
  } catch (error) {
    console.error('Failed to delete subscriptionType:', error);
    snackbar.value = {
      show: true,
      text: 'Erreur lors de la suppression du subscriptionType',
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
