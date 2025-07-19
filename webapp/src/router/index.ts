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
      meta: { layout: 'Auth', fetchMe: false }
    },
    { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue'), meta: { requiresAdmin: true } },
    { path: '/heroes', name: 'heroes', component: () => import('../views/HeroesView.vue') },
    { path: '/theme-demo', name: 'theme-demo', component: () => import('../design-system/views/ThemeDemo.vue') },
    { path: '/tailwind-demo', name: 'tailwind-demo', component: () => import('../views/TailwindDemo.vue') },
    { path: '/naive-demo', name: 'naive-demo', component: () => import('../views/NaiveUIDemo.vue') },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // Récupérer les données user SAUF si explicitement désactivé
  if (to.meta.fetchMe !== false) {
    await store.fetchMe()
  }

  // Routes publiques
  if (to.path === '/login') {
    if (store.isLogged) {
      await store.logoutWithoutRedirect()
    }
    return next()
  }

  // Vérification de l'authentification pour les routes protégées
  if (!store.isLogged) {
    return next('/login')
  }

  // Vérification des droits admin si nécessaire
  if (to.meta.requiresAdmin && !store.isAdmin) {
    return next('/')
  }

  next()
})

export default router
