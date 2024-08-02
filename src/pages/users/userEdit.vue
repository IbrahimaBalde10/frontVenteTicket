<template>
  <VRow>
    <VCol cols="12">
      <VCard class="auth-card pa-8" max-width="1100">
        <VCardTitle class="text-2xl font-weight-bold">
          Modifier un utilisateur
        </VCardTitle>

        <VCardText>
          <VForm @submit.prevent="updateUser">
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="user.nom"
                  label="Nom"
                  placeholder="Enter user's last name"
                  :error-messages="errors.nom"
                  required
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="user.prenom"
                  label="Prenom"
                  placeholder="Enter user's first name"
                  :error-messages="errors.prenom"
                  required
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="user.telephone"
                  label="Telephone"
                  placeholder="Enter user's phone number"
                  :error-messages="errors.telephone"
                  required
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="user.email"
                  label="Email"
                  placeholder="Enter user's email"
                  :error-messages="errors.email"
                  type="email"
                  required
                />
              </VCol>
              
              <VCol cols="12" sm="6">
                <VSelect
                  v-model="user.role"
                  :items="roles"
                  label="Role"
                  placeholder="Select role"
                  :error-messages="errors.role"
                  required
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VSelect
                  v-model="user.status"
                  :items="statuses"
                  label="Status"
                  placeholder="Select status"
                  :error-messages="errors.status"
                  required
                />
              </VCol>
              
              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <VBtn block type="submit" color="primary">Modifier</VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn block @click="() => router.push('/userManagement')" color="error">Cancel</VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <VSnackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
        >
          {{ snackbar.message }}
        </VSnackbar>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const user = ref({ id: '', nom: '', prenom: '', telephone: '', role: '', status: '', email: '' });
const roles = ['Admin', 'Comptable', 'Client', 'Vendeur'];
const statuses = ['active', 'desactive'];

const errors = ref({
  nom: '',
  prenom: '',
  telephone: '',
  role: '',
  status: '',
  email: ''
});

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
});

onMounted(async () => {
  const userId = route.params.id;
  try {
    const fetchedUser = await store.dispatch('users/fetchUserById', userId);
    user.value = fetchedUser;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
});

const validateForm = () => {
  let isValid = true;

  if (!user.value.nom) {
    errors.value.nom = 'Nom is required';
    isValid = false;
  } else {
    errors.value.nom = '';
  }

  if (!user.value.prenom) {
    errors.value.prenom = 'Prenom is required';
    isValid = false;
  } else {
    errors.value.prenom = '';
  }

  if (!user.value.telephone) {
    errors.value.telephone = 'Telephone is required';
    isValid = false;
  } else {
    errors.value.telephone = '';
  }

  if (!user.value.role) {
    errors.value.role = 'Role is required';
    isValid = false;
  } else {
    errors.value.role = '';
  }

  if (!user.value.status) {
    errors.value.status = 'Status is required';
    isValid = false;
  } else {
    errors.value.status = '';
  }

  if (!user.value.email) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(user.value.email)) {
    errors.value.email = 'Email is invalid';
    isValid = false;
  } else {
    errors.value.email = '';
  }

  return isValid;
};

const updateUser = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    await store.dispatch('users/updateUser', user.value);
    snackbar.value.message = 'Utilisateur modifié avec succès';
    snackbar.value.color = 'success';
    snackbar.value.show = true;
    console.log(snackbar.value); // Debugging line

    await nextTick();
    setTimeout(() => {
      snackbar.value.show = false;
      router.push({ name: 'userManagement' });
    }, snackbar.value.timeout);
  } catch (error) {
    // console.error('Error updating user:', error);
    snackbar.value.message = 'Erreur lors de la modification de l\'utilisateur';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
    console.log(snackbar.value); // Debugging line
  }
};
</script>

<style scoped>
.auth-card {
  padding: 24px;
  padding-top: 28px;
  max-width: 800px;
}
</style>
