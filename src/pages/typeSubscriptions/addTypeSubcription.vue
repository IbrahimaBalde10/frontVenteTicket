<!-- src/views/pages/AddSubscriptionType .vue -->
<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();


const   newSubscriptionType  = ref({ name: '', price: '' });

const addSubscriptionType  = async () => {
  try {
    await store.dispatch('typeSubscriptions/addTypeSubscription',   newSubscriptionType .value);
    router.push({ name: 'typeSubscriptionsManagement' }); // Make sure you have a route named 'SubscriptionType Management'
  } catch (error) {
    console.error('Error adding SubscriptionType :', error);
  }
};
</script>

<template>
  <div>
    <h1>Add SubscriptionType </h1>
    <form @submit.prevent="addSubscriptionType " class="SubscriptionType -form">
        <div class="form-group">
            <label for="name">Name</label>
            <select id="name" v-model="  newSubscriptionType .name" required>
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Mensuelle">Mensuelle</option>
                <option value="Annuelle">Annuelle</option>
            </select>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" v-model="  newSubscriptionType .price" required />
      </div>
      <button type="submit" class="submit-button">Add SubscriptionType </button>
    </form>
  </div>
  <VerticalNavLink
    color="success"
    :item="{
      title: 'Annuler',
      icon: 'bx-typeTicket-plus',
      to: '/typeSubscriptionsManagement',
    }"
  />
         <!-- <button type="submit" to="typeSubscriptionsManagement" color="success" class="submit-button">Annuler</button> -->

</template>

<style scoped>
.SubscriptionType -form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background: #0056b3;
}
</style>
