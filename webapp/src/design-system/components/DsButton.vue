<script setup lang="ts">
/**
 * Props for the DsButton component.
 */
interface Props {
  /** The text content of the button. */
  text: string;
  /** Visual variant of the button. */
  variant?: 'primary' | 'secondary';
  /** Size of the button. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button is in a loading state. */
  loading?: boolean;
}

/**
 * Emits for the DsButton component.
 */
interface Emits {
  /** Emitted when the button is clicked. */
  click: [];
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

const getVariantClasses = (): string => {
  // Returns only background and hover background color classes.
  // Shadow will be handled directly in the template or via a separate utility if needed.
  switch (props.variant) {
    case 'primary':
      return 'bg-primary hover:bg-primary-hover';
    case 'secondary':
      return 'bg-secondary hover:bg-secondary-hover';
    default:
      return 'bg-primary hover:bg-primary-hover';
  }
}

const getSizeClasses = (): string => {
  switch (props.size) {
    case 'sm':
      return 'px-btn-px-sm py-btn-py-sm text-sm';
    case 'md':
      return 'px-btn-px-md py-btn-py-md text-base';
    case 'lg':
      return 'px-btn-px-lg py-btn-py-lg text-lg';
    default:
      return 'px-btn-px-md py-btn-py-md text-base';
  }
}
</script>

<template>
  <button
    @click="handleClick"
    :disabled="disabled || loading"
    :class="[
      'group', // For sheen effect
      // Classes de base
      'relative font-bold text-textBase rounded-md', // Use textBase and new default rounded-md
      'transform transition-all duration-200 ease-in-out',
      'border border-white/20 backdrop-blur-sm', // Keep or replace with neutral token

      // Couleurs de fond (déjà géré par getVariantClasses) et ombres glow
      getVariantClasses(),
      props.variant === 'primary' ? 'shadow-glow-primary' : 'shadow-glow-secondary',

      // Tailles
      getSizeClasses(),

      // États
      {
        'hover:scale-105 active:scale-95': !disabled && !loading, // Removed hover:shadow-2xl
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
      }
    ]"
  >
    <!-- Effet de surbrillance au hover (optionnel) -->
    <div
      class="absolute inset-0 rounded-md bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"
      :class="{ 'pointer-events-none': disabled || loading }"
    ></div>

    <!-- Contenu du bouton -->
    <span class="relative flex items-center justify-center gap-2">
      <!-- Spinner de loading -->
      <svg
        v-if="loading"
        class="animate-spin h-4 w-4 text-textBase"
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

    <!-- Effet de "sheen" (brillance animée) -->
    <div class="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
    </div>
  </button>
</template>

<style scoped>
/* Scoped box-shadows for hover are removed, now using Tailwind shadow-glow tokens */

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