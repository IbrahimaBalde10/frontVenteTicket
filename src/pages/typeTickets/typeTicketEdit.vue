<!-- src/views/pages/EditTypeTicket.vue -->
<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const typeTicket = ref({ id: '', name: '', price: '' });

onMounted(async () => {
  const typeTicketId = route.params.id;
  try {
    const fetchedTypeTicket = await store.dispatch('typeTickets/fetchTypeTicketById', typeTicketId);
    typeTicket.value = fetchedTypeTicket;
  } catch (error) {
    console.error('Error fetching typeTicket:', error);
  }
});

const updateTypeTicket = async () => {
  try {
    await store.dispatch('typeTickets/updateTypeTicket', typeTicket.value);
    router.push({ name: 'typeTicketsManagement' }); // Make sure you have a route named 'typeTicketManagement'
  } catch (error) {
    console.error('Error updating typeTicket:', error);
  }
};
</script>

<template>
  <div>
    <h1>Edit Type Ticket</h1>
    <form @submit.prevent="updateTypeTicket" class="edit-typeTicket-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="typeTicket.name" required />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" v-model="typeTicket.price" required />
      </div>
     <div class="row">
      <div class="col-md-2">
        <button type="submit" class="submit-button">Update Type Ticket</button>
      </div>
      <div class="col-md-5">
        <!-- <p  to: '/typeTicketsManagement' >Annuler</p> -->
         <VerticalNavLink
          color="success"
          :item="{
            title: 'Annuler',
            icon: 'bx-typeTicket-plus',
            to: '/typeTicketsManagement',
          }"
      />
      </div>
     </div>
    </form>
   
  </div>
</template>

<style scoped>
.edit-typeTicket-form {
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

.form-group input {
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
