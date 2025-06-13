/**
 * @fileoverview Composable Vue 3 pour gérer un état de chargement local et indépendant.
 *
 * @description
 * Ce composable fournit une logique encapsulée pour afficher un loader au sein d'un
 * composant spécifique, tout en garantissant un temps d'affichage minimum pour
 * une meilleure expérience utilisateur.
 *
 * Chaque appel à `useLocalLoader()` crée une instance indépendante. Cela permet d'avoir
 * plusieurs loaders sur la même page qui ne s'interfèrent pas entre eux.
 *
 * @usage
 * Idéal pour des tâches asynchrones propres à un composant : charger les données
 * d'une carte, soumettre un formulaire, rafraîchir une section, etc.
 *
 * // Dans votre composant .vue
 * import { useLocalLoader } from '@/composables/useLocalLoader';
 * import LocalLoader from '@/components/LocalLoader.vue';
 *
 * // 1. Initialisez le composable
 * const { isLoading, withLoader } = useLocalLoader(500);
 *
 * // 2. Enveloppez votre fonction asynchrone avec `withLoader`
 * async function chargerDonnees() {
 *   await withLoader(async () => {
 *     // Votre logique (ex: appel API) ici...
 *   });
 * }
 *
 * // 3. Dans le template, liez le loader à la variable `isLoading`
 * // <div class="relative">
 * //   <LocalLoader :loading="isLoading" />
 * //   ...
 * // </div>
 */
import { ref, readonly } from 'vue'

/**
 * Composable pour gérer l'état d'un loader local avec un temps d'affichage minimum.
 * @param minDisplayTime - Le temps minimum d'affichage du loader en ms. Par défaut 500ms.
 */
export function useLocalLoader(minDisplayTime = 500) {
  const isLoading = ref(false)

  /**
   * Exécute une fonction asynchrone en affichant un loader
   * pendant au moins `minDisplayTime`.
   * @param asyncFn - La fonction asynchrone à exécuter (ex: un appel API).
   */
  async function withLoader<T>(asyncFn: () => Promise<T>): Promise<T | void> {
    isLoading.value = true

    try {
      // On attend en parallèle la résolution de deux promesses :
      // 1. La tâche asynchrone que l'on veut exécuter (asyncFn).
      // 2. Un simple minuteur qui se résout après `minDisplayTime`.
      // `Promise.all` ne se terminera que lorsque la plus lente des deux sera finie.
      const [result] = await Promise.all([
        asyncFn(),
        new Promise(resolve => setTimeout(resolve, minDisplayTime))
      ])

      // On retourne le résultat de la vraie tâche (le premier élément du tableau).
      return result

    } catch (error) {
      // Si `asyncFn` échoue, l'erreur sera capturée ici.
      console.error('An error occurred within withLoader:', error)
      // On propage l'erreur pour que le composant qui l'utilise puisse la traiter.
      throw error;
    } finally {
      // Ce bloc s'exécute toujours, que la promesse réussisse ou échoue.
      isLoading.value = false
    }
  }

  return {
    // `isLoading` est retourné en lecture seule pour une meilleure encapsulation.
    isLoading: readonly(isLoading),
    withLoader
  }
}
