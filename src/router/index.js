import { createRouter, createWebHistory } from 'vue-router'

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
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
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
          path: 'transcationManagement',
          component: () => import('../pages/transactions/transactionManagement.vue'),
          meta: { requiresAuth: true } ,
          name: 'transcation' //addTypeTicket
        },

         { 
          path: 'statistiqueTransaction',
          component: () => import('../pages/transactions/Statistique.vue'),
          meta: { requiresAuth: true } ,
          name: 'statistiqueTransaction' //addTypeTicket
        },
          { 
          path: 'graphesTransaction',
          component: () => import('../pages/transactions/Graphes.vue'),
          meta: { requiresAuth: true } ,
          name: 'graphesTransaction' //addTypeTicket
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
          name: 'login' // Assurez-vous que le nom de route est 'login'
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

export default router
