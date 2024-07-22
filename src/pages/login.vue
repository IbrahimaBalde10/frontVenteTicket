<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import logo from '@images/logo.svg?raw';

const form = ref({
  identifier: '',
  password: '',
  remember: false,
});

const isPasswordVisible = ref(false);
const errors = ref({
  identifier: '',
  password: ''
});

const store = useStore();
const router = useRouter();

const loginError = computed(() => store.getters.loginError); // Add this line

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
          SunuAPP
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Welcome to  SunuAPP! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleLogin">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.identifier"
                autofocus
                placeholder="Email or phone"
                label="Email or Phone"
                :error-messages="errors.identifier"
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

              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <RouterLink class="text-primary ms-2 mb-1" to="javascript:void(0)">
                  Forgot Password?
                </RouterLink>
              </div>

              <VBtn block type="submit">
                Login
              </VBtn>
            </VCol>
<!-- 
            <VCol cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Create an account
              </RouterLink>
            </VCol> -->

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <!-- <span class="mx-4">or</span> -->
              <VDivider />
            </VCol>

            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
        <div v-if="loginError" class=" error error-message">{{ loginError }}</div> <!-- Add this line -->
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
  .error{
    color: brown;
  }
</style>
