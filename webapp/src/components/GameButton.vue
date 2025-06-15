<script setup lang="ts">
interface Props {
  text: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

interface Emits {
  click: []
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}

const getVariantClasses = () => {
  const variants = {
    primary: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-blue-500/25',
    secondary: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 hover:from-slate-500 hover:via-slate-600 hover:to-slate-700 shadow-slate-500/25'
  }
  return variants[props.variant]
}

const getSizeClasses = () => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  return sizes[props.size]
}
</script>

<template>
  <button
    @click="handleClick"
    :disabled="disabled || loading"
    :class="[
      // Classes de base
      'relative font-bold text-white rounded-lg',
      'transform transition-all duration-200 ease-in-out',
      'border border-white/20 backdrop-blur-sm',
      'shadow-lg hover:shadow-xl',

      // Gradient et couleurs selon variant
      getVariantClasses(),

      // Tailles
      getSizeClasses(),

      // Classe pour le CSS scoped
      variant,

      // États
      {
        'hover:scale-105 hover:shadow-2xl active:scale-95': !disabled && !loading,
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
      }
    ]"
  >
    <!-- Effet de glow au hover -->
    <div
      class="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"
      :class="{ 'pointer-events-none': disabled || loading }"
    ></div>

    <!-- Contenu du bouton -->
    <span class="relative flex items-center justify-center gap-2">
      <!-- Spinner de loading -->
      <svg
        v-if="loading"
        class="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <!-- Texte du bouton -->
      <span>{{ text }}</span>
    </span>

    <!-- Effet de particules gaming (optionnel) -->
    <div class="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
    </div>
  </button>
</template>

<style scoped>
/* Effet de glow gaming pour variant primary */
button.primary:not(:disabled):hover {
  box-shadow:
    0 0 20px rgba(59, 130, 246, 0.4),
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Effet de glow gaming pour variant secondary */
button.secondary:not(:disabled):hover {
  box-shadow:
    0 0 20px rgba(107, 114, 128, 0.3),
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animation d'apparition */
button {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>