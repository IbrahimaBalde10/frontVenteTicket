<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary" v-html="logo" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Sneat
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Adventure starts here 🚀</h5>
        <p class="mb-0">Make your app management easy and fun!</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleRegister">
          <VRow>
            <VCol cols="12">
              <VTextField 
                v-model="form.nom" 
                autofocus 
                label="Nom" 
                placeholder="Entrer votre nom" 
                :error-messages="errors.nom" 
              />
            </VCol>
            <VCol cols="12">
              <VTextField 
                v-model="form.prenom" 
                autofocus 
                label="Prénom" 
                placeholder="Entrer votre prénom" 
                :error-messages="errors.prenom" 
              />
            </VCol>
            <VCol cols="12">
              <VTextField 
                v-model="form.telephone" 
                autofocus 
                label="Téléphone" 
                placeholder="Entrer votre téléphone" 
                :error-messages="errors.telephone" 
              />
            </VCol>
            <VCol cols="12">
              <VTextField 
                v-model="form.email" 
                label="Email" 
                placeholder="balde@email.com" 
                type="email" 
                :error-messages="errors.email" 
              />
            </VCol>
            <VCol cols="12">
              <VTextField 
                v-model="form.password" 
                label="Password" 
                placeholder="············" 
                :type="isPasswordVisible ? 'text' : 'password'" 
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'" 
                @click:append-inner="isPasswordVisible = !isPasswordVisible" 
                :error-messages="errors.password" 
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox id="privacy-policy" v-model="form.privacyPolicies" inline />
                <VLabel for="privacy-policy" style="opacity: 1;">
                  <span class="me-1">I agree to</span>
                  <a href="javascript:void(0)" class="text-primary">privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn block type="submit">Sign up</VBtn>
            </VCol>
            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" to="/login">Sign in instead</RouterLink>
            </VCol>
            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>
            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
        <div v-if="generalErrorMessage" class="error-message">{{ generalErrorMessage }}</div>
      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import logo from '@images/logo.svg?raw';

const form = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  password: '',
  privacyPolicies: false
});

const isPasswordVisible = ref(false);
const generalErrorMessage = ref('');
const errors = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  password: ''
});

const store = useStore();
const router = useRouter();

const validateForm = () => {
  let isValid = true;
  if (!form.value.nom) {
    errors.value.nom = 'Nom is required';
    isValid = false;
  } else {
    errors.value.nom = '';
  }

  if (!form.value.prenom) {
    errors.value.prenom = 'Prénom is required';
    isValid = false;
  } else {
    errors.value.prenom = '';
  }

  if (!form.value.telephone) {
    errors.value.telephone = 'Téléphone is required';
    isValid = false;
  } else {
    errors.value.telephone = '';
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Email is invalid';
    isValid = false;
  } else {
    errors.value.email = '';
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required';
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  } else {
    errors.value.password = '';
  }

  return isValid;
};

const handleRegister = async () => {
  generalErrorMessage.value = '';
  if (!validateForm()) {
    return;
  }
  
  try {
    const userData = {
      nom: form.value.nom,
      prenom: form.value.prenom,
      telephone: form.value.telephone,
      email: form.value.email,
      password: form.value.password
    };
    await store.dispatch('register', userData);
    router.push('/');
  } catch (error) {
    generalErrorMessage.value = 'An error occurred during registration. Please try again.';
    console.error('An error occurred during registration:', error);
  }
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
