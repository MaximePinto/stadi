# 🎨 useDesignSystem - Guide d'utilisation

Composable Vue 3 intégrant VueUse pour une gestion avancée des thèmes.

## 🚀 Utilisation de base

```typescript
import { useDesignSystem } from '@/composables/useDesignSystem'

// Dans votre composant
const designSystem = useDesignSystem()

// Accès aux états
console.log(designSystem.isDark.value) // true/false
console.log(designSystem.deviceType.value) // 'mobile' | 'tablet' | 'desktop'
console.log(designSystem.preferredColorScheme.value) // 'dark' | 'light' | 'no-preference'
```

## ⚙️ Configuration

```typescript
const designSystem = useDesignSystem({
  autoDetectPreferences: true,    // Détection automatique des préférences système
  syncWithSystem: true,          // Synchronisation bidirectionnelle avec VueUse
  enableReducedMotion: true,     // Respecter les préférences d'animation
  responsiveBreakpoints: {       // Breakpoints personnalisés
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  }
})
```

## 📱 États réactifs disponibles

### VueUse States
- `isDark` - Mode sombre actuel (synchronisé avec le système)
- `preferredColorScheme` - Préférence système ('dark' | 'light' | 'no-preference')
- `isReducedMotion` - Préférence animations réduites

### Responsive States  
- `isMobile` - Appareil mobile
- `isTablet` - Tablette  
- `isDesktop` - Desktop
- `deviceType` - Type d'appareil calculé

### Store States
- `themeStore` - Accès direct au store Pinia
- `adaptiveMode` - Mode adaptatif selon les préférences
- `systemSupportsColorScheme` - Support des préférences couleurs

## 🎯 Actions disponibles

### VueUse Actions
```typescript
designSystem.toggleDark()                    // Bascule VueUse isDark
designSystem.smartToggle()                   // Bascule intelligente (VueUse + Store)
```

### Theme Actions
```typescript
designSystem.setPresetWithMotion('gaming')   // Change preset avec gestion animations
designSystem.resetToSystemPreferences()     // Reset aux préférences système
```

### Device Actions
```typescript
const config = designSystem.autoConfigureForDevice()
// Retourne: { showCompactMode, reducedAnimations, quickToggleOnly }
```

## 🎨 Intégration avec DsThemeSelector

```vue
<template>
  <DsThemeSelector 
    :auto-adaptive="true"        <!-- Configuration automatique -->
    :show-system-info="true"     <!-- Afficher infos VueUse -->
    :show-color-picker="false"   <!-- Masquer sur mobile -->
  />
</template>
```

### Props du ThemeSelector amélioré:
- `autoAdaptive` - Configuration automatique selon l'appareil
- `showSystemInfo` - Afficher les informations système VueUse  
- Toutes les props existantes sont conservées

## 💡 Exemple complet

```vue
<script setup lang="ts">
import { useDesignSystem } from '@/composables/useDesignSystem'
import { watch } from 'vue'

const designSystem = useDesignSystem({
  autoDetectPreferences: true,
  syncWithSystem: true
})

// Réagir aux changements de préférence système
watch(designSystem.preferredColorScheme, (newScheme) => {
  console.log('Préférence système changée:', newScheme)
})

// Configuration adaptative pour l'UI
const uiConfig = computed(() => ({
  showAnimations: !designSystem.isReducedMotion.value,
  compactMode: designSystem.isMobile.value,
  advancedControls: designSystem.isDesktop.value
}))
</script>

<template>
  <div>
    <!-- Interface adaptative -->
    <DsThemeSelector :auto-adaptive="true" />
    
    <!-- Informations debug -->
    <div v-if="uiConfig.advancedControls">
      <p>Mode: {{ designSystem.themeStore.mode }}</p>
      <p>Système: {{ designSystem.preferredColorScheme.value }}</p>
      <p>Appareil: {{ designSystem.deviceType.value }}</p>
    </div>
  </div>
</template>
```

## 🔄 Migration depuis l'ancien système

L'ancien store `useThemeStore()` reste fonctionnel ! Le nouveau composable l'enrichit :

```typescript
// ❌ Avant (fonctionne toujours)
const themeStore = useThemeStore()
themeStore.toggleMode()

// ✅ Maintenant (recommandé)
const designSystem = useDesignSystem()
designSystem.smartToggle() // Plus intelligent avec VueUse
```

## ⚡ Optimisations automatiques

1. **Détection continue** - VueUse surveille les changements système
2. **Animations adaptatives** - Respect automatique des préférences d'accessibilité  
3. **Responsive intelligent** - Configuration UI selon l'appareil
4. **Synchronisation bidirectionnelle** - Store ↔ VueUse toujours en sync
5. **Performance** - Watchers optimisés, pas de re-renders inutiles