<script setup lang="ts">
import { useDesignSystem } from '@/design-system/composables/useDesignSystem'

const { currentTokens, effectiveMode } = useDesignSystem()
</script>

<template>
  <footer
    class="text-center"
    :style="{
      background: `linear-gradient(to right, ${currentTokens.colors[effectiveMode].surface}, ${currentTokens.colors[effectiveMode].surfaceHover}, ${currentTokens.colors[effectiveMode].surfaceActive})`,
      color: currentTokens.colors[effectiveMode].textPrimary,
      padding: `${currentTokens.spacing.xl} 0`
    }"
  >
    <p 
      :style="{
        fontSize: currentTokens.typography.caption.fontSize,
        lineHeight: currentTokens.typography.caption.lineHeight,
        color: currentTokens.colors[effectiveMode].textSecondary
      }"
    >© 2024 GameHub. Tous droits réservés.</p>
  </footer>
</template>
