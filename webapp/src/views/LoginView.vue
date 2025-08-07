<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import stadiumBackground from '../assets/images/stadium_background.webp'

const email = ref('')
const password = ref('')
const router = useRouter()
const user = useUserStore()

async function handleLogin() {
  const ok = await user.login(email.value, password.value)
  if (ok) {
    router.push('/')
  } else {
    alert('Identifiants incorrects')
  }
}
</script>

<template>
  <!-- Container principal avec arrière-plan gaming plein écran -->
  <div class="min-h-screen bg-overwatch flex items-center justify-center">

    <!-- Overlay sombre pour améliorer la lisibilité -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Conteneur principal centré avec largeur maximale -->
    <div class="relative z-10 w-full max-w-6xl mx-auto">

      <!-- Carte principale avec effet glassmorphism -->
      <div class="mt-36 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

        <!-- Grille responsive en 2 colonnes sur grand écran -->
        <div class="grid lg:grid-cols-2 min-h-[600px]">

          <!-- Section gauche : Présentation/Hero -->
          <div class="flex flex-col justify-center items-center text-center p-12 lg:p-16 bg-gradient-to-br from-white/10 to-transparent">

            <!-- Icône gaming avec animation flottante -->
            <div class="text-8xl mb-8 float-animation">🎮</div>

            <!-- Titre principal -->
            <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Prêt pour l'arène ?
            </h1>

            <!-- Sous-titre descriptif -->
            <p class="text-xl text-white/90 font-light drop-shadow-md max-w-md">
              Rejoins la bataille et montre tes talents de gamer !
            </p>

            <!-- Indicateurs animés de chargement/attente -->
            <div class="flex space-x-4 mt-8 opacity-70">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div class="w-2 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
              <div class="w-2 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 1s;"></div>
            </div>
          </div>

          <!-- Section droite : Formulaire de connexion -->
          <div class="bg-white/95 backdrop-blur-sm p-12 lg:p-16 flex flex-col justify-center">

            <!-- Titre du formulaire -->
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
              Connexion
            </h2>

            <!-- Formulaire avec gestion Vue.js -->
            <form class="space-y-6" @submit.prevent="handleLogin">

              <!-- Champ email -->
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 focus:bg-white text-gray-800"
                  placeholder="exemple@email.com"
                />
              </div>

              <!-- Champ mot de passe -->
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 focus:bg-white text-gray-800"
                  placeholder="••••••••"
                />
              </div>

              <!-- Options additionnelles : case à cocher "Se souvenir" -->
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center text-gray-600">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span class="ml-2">Se souvenir de moi</span>
                </label>
              </div>

              <!-- Bouton de soumission avec effets visuels -->
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg glow-animation"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-overwatch {
  background-image: url('/src/assets/images/stadium_background.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
}

.glow-animation {
  animation: glow 2s ease-in-out infinite;
}
</style>
