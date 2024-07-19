<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import logo from '@images/logo.svg?raw';

const form = ref({
  identifier: '',
  password: '',
  remember: false,
});

const isPasswordVisible = ref(false);
const generalErrorMessage = ref('');
const errors = ref({
  identifier: '',
  password: ''
});

const store = useStore();
const router = useRouter();

const validateForm = () => {
  let isValid = true;
  
  if (!form.value.identifier) {
    errors.value.identifier = 'Email or phone is required';
    isValid = false;
  } else {
    errors.value.identifier = '';
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required';
    isValid = false;
  } else {
    errors.value.password = '';
  }

  return isValid;
};

const handleLogin = async () => {
  generalErrorMessage.value = '';
  if (!validateForm()) {
    return;
  }

  try {
    const userData = {
      identifier: form.value.identifier,
      password: form.value.password,
      remember: form.value.remember
    };
    await store.dispatch('login', userData);
    router.push('/');
  } catch (error) {
    generalErrorMessage.value = 'An error occurred during login. Please try again.';
    console.error('An error occurred during login:', error);
  }
};
</script>
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
        <h5 class="text-h5 mb-1">
          Welcome to Sneat! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleLogin">
          <VRow>
            <!-- email or phone -->
            <VCol cols="12">
              <VTextField
                v-model="form.identifier"
                autofocus
                placeholder="Email or phone"
                label="Email or Phone"
                :error-messages="errors.identifier"
              />
            </VCol>

            <!-- password -->
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

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <!-- <VCheckbox v-model="form.remember" label="Remember me" /> -->

                <RouterLink class="text-primary ms-2 mb-1" to="javascript:void(0)">
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn block type="submit">
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Create an account
              </RouterLink>
            </VCol>

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol cols="12" class="text-center">
              <!-- <AuthProvider /> -->
            </VCol>
          </VRow>
        </VForm>
        <div v-if="generalErrorMessage" class="error-message">{{ generalErrorMessage }}</div>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
