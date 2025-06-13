<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const loaders = [
  {
    src: new URL('@/assets/images/loaders/globalLoader/air-jump-doomfist.gif', import.meta.url).href,
    class: 'w-44 h-44'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/dva-get-meca.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/fist-floor-doom.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/genji-sword.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/global-loader-dva.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/jump-doomfist-fist.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/lucio-shoot.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/mc-cree-shoot.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/mercy-overwatch.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/phara-ult.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/widow-grab.gif', import.meta.url).href,
    class: 'w-96 h-52'
  },
  {
    src: new URL('@/assets/images/loaders/globalLoader/zarya-shoot.gif', import.meta.url).href,
    class: 'w-96 h-52'
  }
]

const selectedLoader = ref(loaders[0])

watch(
  () => uiStore.isLoading,
  (newIsLoading) => {
    if (newIsLoading) {
      const randomIndex = Math.floor(Math.random() * loaders.length)
      selectedLoader.value = loaders[randomIndex]
    }
  }
)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="uiStore.isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm cursor-wait"
    >
      <img
        :src="selectedLoader.src"
        alt="Chargement en cours..."
        :class="[selectedLoader.class, 'mb-4']"
      />

      <p class="text-white text-xl font-semibold">
        {{ uiStore.loadingMessage }}
      </p>
    </div>
  </Transition>
</template>

<style scoped>
/* Styles inchangés */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>