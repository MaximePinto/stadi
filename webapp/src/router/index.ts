import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'Auth' }
    },
    { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue'), meta: { requiresAdmin: true } },
    { path: '/heroes', name: 'heroes', component: () => import('../views/HeroesView.vue') },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // Routes publiques - pas besoin d'initialiser
  if (to.path === '/login') {
    store.logout()
    next()
    return
  }

  // ✅ Seulement pour les routes protégées
  await store.initPromise

  // Vérification de l'authentification pour les routes protégées
  if (!store.isLogged) {
    next('/login')
    return
  }

  // Vérification des droits admin si nécessaire
  if (to.meta.requiresAdmin && !store.isAdmin) {
    next('/')
    return
  }

  next()
})

export default router
