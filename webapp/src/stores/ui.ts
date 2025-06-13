/**
 * @fileoverview Store Pinia pour gérer l'état de l'interface utilisateur globale.
 *
 * @description
 * Ce store contrôle des éléments d'UI qui sont uniques et partagés à travers toute
 * l'application, comme le loader global principal.
 *
 * Il est conçu pour être un singleton (une seule source de vérité). Ne l'utilisez pas
 * pour des états qui doivent être indépendants dans plusieurs composants à la fois.
 *
 * @usage
 * Idéal pour les actions qui affectent toute la page : connexion, déconnexion,
 * initialisation de l'application, etc.
 *
 * import { useUiStore } from '@/stores/ui';
 * const uiStore = useUiStore();
 *
 * async function uneActionGlobale() {
 *   uiStore.showLoader('Chargement...');
 *   try {
 *     await lAppelApi();
 *   } finally {
 *       // N'oubliez pas le 'await' car la fonction gère un délai minimum.
 *       await uiStore.hideLoader(500);
 *     }
 * }
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const loadingRequestCount = ref(0)
  const loadingMessage = ref('Chargement...')
  const loaderStartTime = ref(0)

  const isLoading = computed(() => loadingRequestCount.value > 0)

  function showLoader(message = 'Chargement...') {
    if (loadingRequestCount.value === 0) {
      loadingMessage.value = message
      loaderStartTime.value = Date.now()
    }
    loadingRequestCount.value++
  }

  /**
   * Termine une demande de chargement.
   * Le loader se masquera si c'était la dernière demande en cours.
   * @param minDisplayTime - Le temps minimum d'affichage en ms.
   */
  async function hideLoader(minDisplayTime = 500) {
    // Ne rien faire si le compteur est déjà à 0
    if (loadingRequestCount.value <= 0) {
      return
    }

    // S'il s'agit de la dernière requête en cours (compteur à 1)
    if (loadingRequestCount.value === 1) {
      const elapsedTime = Date.now() - loaderStartTime.value
      const remainingTime = minDisplayTime - elapsedTime

      if (remainingTime > 0) {
        // On attend d'abord le délai restant
        await new Promise(resolve => setTimeout(resolve, remainingTime))
      }

      // On décrémente le compteur SEULEMENT APRÈS l'attente potentielle.
      // C'est le changement clé.
      loadingRequestCount.value--
    } else {
      // S'il y a d'autres requêtes, on décrémente simplement sans attendre.
      loadingRequestCount.value--
    }
  }

  return {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader
  }
})
