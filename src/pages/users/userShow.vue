<template>
  <!-- UserDetail.vue -->
  <VDialog :model-value="show" @update:model-value="updateShow" max-width="600px">
    <VCard>
      <VCardTitle class="headline">Détails de l'utilisateur</VCardTitle>
      <VCardText>
        <VList>
          <VListItem>
            <VListItemContent>
              <!-- <VAvatar
                size="100"
                :src="user.profile_photo"
                alt="User Photo"
              /> -->
               <VAvatar
               size="100"
                class="cursor-pointer"
                color="primary"
                variant="tonal"
                :src="user.profile_photo"
                 alt="User Photo"
                >
                <!-- <VImg :src="user.profile_photo" /> -->
               </VAvatar>
            </VListItemContent>
          </VListItem>

          <VListItem>
            <VListItemContent>Identifiant: {{ user.id }}</VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>Nom: {{ user.nom }}</VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>Prenom: {{ user.prenom }}</VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>Telephone: {{ user.telephone }}</VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>Email: {{ user.email }}</VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>Role: {{ user.role }}</VListItemContent>
          </VListItem>
          <VListItem>
            <VListItemContent>Status: {{ user.status }}</VListItemContent>
          </VListItem>
        </VList>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="closeDialog">Fermer</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const show = ref(false);
const user = ref({});

const updateShow = (value) => {
  show.value = value;
};

const closeDialog = () => {
  show.value = false;
};

const props = defineProps(['userId']);

watch(
  () => props.userId,
  async (newId) => {
    if (newId) {
      // Fetch the user details using the userId
      user.value = await store.dispatch('users/fetchUserById', newId);
      show.value = true;
    }
  }
);
</script>
