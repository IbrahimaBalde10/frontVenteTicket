<template>
  <!-- <div class="auth-wrapper d-flex align-center justify-center pa-6"> -->
  <VRow>
    <VCol cols="12">
    <VCard class="auth-card pa-8 pt-7" gap-5 max-width="1100">
      <VCardTitle class="text-2xl font-weight-bold">
        Ajouter un utilisateur
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="addUser">
          <VRow>
            <VCol cols="12" sm="6">
              <VTextField 
                v-model="newUser.nom" 
                label="Nom" 
                placeholder="Enter user's last name" 
                :error-messages="errors.nom" 
                required
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField 
                v-model="newUser.prenom" 
                label="Prenom" 
                placeholder="Enter user's first name" 
                :error-messages="errors.prenom" 
                required
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField 
                v-model="newUser.telephone" 
                label="Telephone" 
                placeholder="Enter user's phone number" 
                :error-messages="errors.telephone" 
                required
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VSelect 
                v-model="newUser.role" 
                :items="roles" 
                label="Role" 
                placeholder="Select role" 
                :error-messages="errors.role" 
                required
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField 
                v-model="newUser.email" 
                label="Email" 
                placeholder="Enter user's email" 
                :error-messages="errors.email" 
                type="email" 
                required
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField 
                v-model="newUser.password" 
                label="Password" 
                placeholder="Enter user's password" 
                :type="isPasswordVisible ? 'text' : 'password'" 
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" 
                @click:append-inner="isPasswordVisible = !isPasswordVisible" 
                :error-messages="errors.password" 
                required
              />
            </VCol>
            <VCol cols="12">
              <VRow>
                <VCol cols="6">
                  <VBtn block type="submit" color="primary">Ajouter un utilisateur</VBtn>
                </VCol>
                <VCol cols="6">
                  <VBtn block @click="() => router.push('/userManagement')" color="error">Annuler</VBtn>
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
  <!-- </div> -->
</template>

<script setup>
// import { ref } from 'vue';
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';

const store = useStore();
const router = useRouter();

const newUser = ref({ nom: '', prenom: '', telephone: '', role: '', email: '', password: '' });
const isPasswordVisible = ref(false);

const roles = ['Admin', 'Comptable', 'Client', 'Vendeur'];

const errors = ref({
  nom: '',
  prenom: '',
  telephone: '',
  role: '',
  email: '',
  password: ''
});

// 
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
});

const validateForm = () => {
  let isValid = true;

  if (!newUser.value.nom) {
    errors.value.nom = 'Nom is required';
    isValid = false;
  } else {
    errors.value.nom = '';
  }

  if (!newUser.value.prenom) {
    errors.value.prenom = 'Prenom is required';
    isValid = false;
  } else {
    errors.value.prenom = '';
  }

  if (!newUser.value.telephone) {
    errors.value.telephone = 'Telephone is required';
    isValid = false;
  } else {
    errors.value.telephone = '';
  }

  if (!newUser.value.role) {
    errors.value.role = 'Role is required';
    isValid = false;
  } else {
    errors.value.role = '';
  }

  if (!newUser.value.email) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(newUser.value.email)) {
    errors.value.email = 'Email is invalid';
    isValid = false;
  } else {
    errors.value.email = '';
  }

  if (!newUser.value.password) {
    errors.value.password = 'Password is required';
    isValid = false;
  } else if (newUser.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  } else {
    errors.value.password = '';
  }

  return isValid;
};
/**
 * const updateUser = async () => {
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
 */

const addUser = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    await store.dispatch('users/addUser', newUser.value);
// 
 snackbar.value.message = 'Utilisateur ajouté avec succès';
    snackbar.value.color = 'success';
    snackbar.value.show = true;
    console.log(snackbar.value); // Debugging line

    await nextTick();
    setTimeout(() => {
      snackbar.value.show = false;
      router.push({ name: 'userManagement' });
    }, snackbar.value.timeout);
// 
    // router.push({ name: 'userManagement' });
//   } catch (error) {
//     console.error('Error adding user:', error);
//   }
// };
}catch (error) {
    // console.error('Error updating user:', error);
    snackbar.value.message = 'Erreur lors de l\'ajout de l\'utilisateur';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
    console.log(snackbar.value); // Debugging line
  }
};

// const annuler = async () => { router.push({ name: 'userManagement' });}
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.auth-card {
  padding: 24px;
  padding-top: 28px;
  max-width: 600px;
}

.submit-button {
  margin-top: 16px;
}
</style>
