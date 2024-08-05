import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'; // Importer le store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },     
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { requiresAuth: true }
          
        },
        // test
        {
          path: '/testDasboardVue',
          component: () => import('@/pages/transactions/Dashboard.vue'),
          name: 'testDasboardVue',  
        },
      //  route Users
         { 
          path: 'userManagement',
          component: () => import('../pages/users/user.vue'),
          meta: { requiresAuth: true } ,
          name: 'userManagement'  
        },
        {
          path: 'addUser',
          component: () => import('../pages/users/addUser.vue'),
        },
        {
          path: 'user/:id/show',
          name: 'user-show',
          component: () => import('../pages/users/userShow.vue'), // Create this component
        },
        {
          path: 'user/:id/edit',
          name: 'user-edit',
          component: () => import('../pages/users/userEdit.vue'), // Create this component
        },
         // route Type de tickets
        //  lister
         { 
          path: 'typeTicketsManagement',
          component: () => import('../pages/typeTickets/ticket.vue'),
          meta: { requiresAuth: true },
          name: 'typeTicketsManagement' //addTypeTicket
        },
        // ajouter
         { 
          path: 'addTypeTicket',
          component: () => import('../pages/typeTickets/addTypeTicket.vue'),
          meta: { requiresAuth: true } ,
          name: 'addTypeTicket' 
        },
        // modifier
         {
          path: 'typeTicket/:id/edit',
          name: 'typeTicket-edit',
          component: () => import('../pages/typeTickets/typeTicketEdit.vue'), // Create this component
        },
        // my profile
         {
          path: 'account-settings',
          component: () => import('../pages/users/account-settings.vue'),
          name: 'account-settings'
        },
         // route Type de subscriptions
        //  lister
         { 
          path: 'typeSubscriptionsManagement',
          component: () => import('../pages/typeSubscriptions/subscription.vue'),
          meta: { requiresAuth: true } ,
          name: 'typeSubscriptionsManagement' 
        },
        // ajouter
         { 
          path: 'addtypeSubscription',
          component: () => import('../pages/typeSubscriptions/addTypeSubcription.vue'),
          meta: { requiresAuth: true } ,
          name: 'addtypeSubscription' 
        },
        // modifier
         {
          path: 'typeSubscription/:id/edit',
          name: 'typeSubscription-edit',
          component: () => import('../pages/typeSubscriptions/typeSubcriptionEdit.vue'), // Create this component
        },
        // show
        {
          path: 'typeSubcription/:id/show',
          name: 'typeSubcription-show',
          component: () => import('../pages/typeSubscriptions/typeSubcriptionShow.vue'), // Create this component
        },
        // route transcation
        //  lister
         { 
          path: 'transcation',
          component: () => import('../pages/transactions/transcation.vue'),
          meta: { requiresAuth: true } ,
          name: 'transcation'
        },
       { 
          path: 'statistiqueTransaction',
          component: () => import('../pages/transactions/Statistique.vue'),
          meta: { requiresAuth: true } ,
          name: 'statistiqueTransaction'
        },
          { 
          path: 'graphesTransaction',
          component: () => import('../pages/transactions/Graphes.vue'),
          meta: { requiresAuth: true } ,
          name: 'graphesTransaction'
        },
        // gestions des trajetsManagement

         { 
          path: 'trajetManagement',
          component: () => import('../pages/trajets/trajet.vue'),
          meta: { requiresAuth: true } ,
          name: 'trajetManagement'  
        },
        {
          path: 'addTrajet',
          component: () => import('../pages/trajets/addTrajet.vue'),
        },
        {
          path: 'trajet/:id/show',
          name: 'trajet-show',
          component: () => import('../pages/trajets/Trajet_Show.vue'), // Create this component
        },
        {
          path: 'trajet/:id/edit',
          name: 'trajet-edit',
          component: () => import('../pages/trajets/trajetEdit.vue'), // Create this component
        },
      ],
      
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
          name: 'login'
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

// Navigation guard pour rediriger les utilisateurs non authentifiés
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router
