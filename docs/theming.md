# �� Système de Theming Unifié

## Vue d'ensemble

Notre système de theming unifié offre une expérience cohérente et flexible à travers toute l'application. Il utilise une architecture centralisée basée sur des **design tokens** qui sont transformés automatiquement en différents formats pour Tailwind CSS, Naive UI et variables CSS.

## Composants principaux

### 1. `tokens.ts` - Source unique de vérité

C'est le fichier central qui définit tous nos tokens de design :

```typescript
export interface DesignTokens {
  colors: {
    light: SemanticColors
    dark: SemanticColors
  }
  typography: TypographyScale
  spacing: SpacingScale
  borderRadius: BorderRadius
  shadows: Shadows
  transitions: {
    fast: string
    normal: string
    slow: string
  }
}
```

**Fonctionnalités clés :**
- ✅ Support natif light/dark
- ✅ Palettes de couleurs complètes (indigo, slate, blue, emerald, amber, red)
- ✅ Presets de thèmes prédéfinis
- ✅ Couleurs sémantiques cohérentes
- ✅ Système de typographie évolutif

### 2. `useDesignSystem.ts` - Composable principal

Composable unifié qui gère tout le système de thèmes :

```typescript
export function useDesignSystem() {
  // État réactif
  const effectiveMode = computed<'light' | 'dark'>()
  const currentTokens = computed<DesignTokens>()
  const naiveTheme = computed<GlobalTheme | null>()
  const naiveThemeOverrides = computed()
  const cssVariables = computed()

  // Actions
  const setThemeMode = (mode: ThemeMode)
  const setThemePreset = (preset: ThemePresetKey)
  const toggleTheme = ()
  const updateCustomColors = (mode, colors)
  const resetCustomizations = ()
}
```

**Fonctionnalités :**
- ✅ Mode auto/light/dark
- ✅ Presets de thèmes
- ✅ Personnalisation en temps réel
- ✅ Persistance des préférences
- ✅ Cache intelligent des thèmes
- ✅ Injection automatique des variables CSS

### 3. Générateurs automatiques

- **`tailwind.generator.ts`** : Génère la configuration Tailwind avec variables CSS
- **`naive-ui.generator.ts`** : Crée les overrides Naive UI automatiquement

## Presets de thèmes disponibles

### 🎯 Default (Gaming)
- **Couleurs** : Indigo primaire, Slate secondaire
- **Style** : Moderne et gaming
- **Mode** : Support light/dark complet

### 🌙 Cyberpunk
- **Couleurs** : Néon et contrastes élevés
- **Style** : Futuriste et immersif
- **Mode** : Optimisé pour le dark mode

### 🌅 Sunset
- **Couleurs** : Dégradés chauds
- **Style** : Chaleureux et accueillant
- **Mode** : Équilibre light/dark

### 🎨 Custom
- **Couleurs** : Personnalisables
- **Style** : Adapté à vos besoins
- **Mode** : Flexibilité totale

## Utilisation

### Dans un composant Vue

```vue
<template>
  <n-config-provider 
    :theme="naiveTheme" 
    :theme-overrides="naiveThemeOverrides"
  >
    <div class="bg-bg-base text-text-primary">
      <button class="btn btn-primary btn-md">
        Mon bouton
      </button>
    </div>
  </n-config-provider>
</template>

<script setup>
import { useDesignSystem } from '@/composables/useDesignSystem'

const { 
  naiveTheme, 
  naiveThemeOverrides, 
  setThemePreset,
  setThemeMode,
  toggleTheme
} = useDesignSystem()
</script>
```

### Changer de thème

```typescript
// Changer le preset
setThemePreset('cyberpunk')

// Changer le mode
setThemeMode('dark')
setThemeMode('light')
setThemeMode('auto') // Suit le système

// Bascule rapide
toggleTheme()

// Personnalisation avancée
updateCustomColors('dark', {
  primary: '#ff6b35',
  primaryHover: '#ff5722',
  background: '#1a1a1a'
})
```

### Classes Tailwind disponibles

```html
<!-- Couleurs -->
<div class="bg-bg-base text-text-primary">
<div class="bg-bg-soft border-border-base">

<!-- Boutons -->
<button class="btn btn-primary btn-md">
<button class="btn btn-secondary btn-lg">

<!-- Ombres -->
<div class="shadow-glow shadow-lg">

<!-- Espacements -->
<div class="p-spacing-md m-spacing-lg">

<!-- Border radius -->
<div class="rounded-radius-md">
```

## Variables CSS injectées

Le système injecte automatiquement ces variables CSS :

```css
:root {
  /* Couleurs */
  --ds-color-primary: #4338ca;
  --ds-color-primary-hover: #4f46e5;
  --ds-text-primary: #1e293b;
  --ds-bg-base: #ffffff;
  
  /* Espacements */
  --ds-spacing-md: 1rem;
  --ds-spacing-lg: 1.5rem;
  
  /* Ombres */
  --ds-shadow-glow: 0 0 20px rgba(67, 56, 202, 0.3);
  
  /* Transitions */
  --ds-transition-normal: 0.2s ease-in-out;
}
```

## Avantages du nouveau système

### 🚀 Performance
- Cache intelligent des thèmes générés
- Variables CSS pour les changements instantanés
- Pas de recompilation Tailwind nécessaire

### 🎨 Flexibilité
- Presets prédéfinis + personnalisation complète
- Support natif light/dark/auto
- Cohérence garantie entre tous les composants

### 🔧 Développement
- API simple et intuitive
- Génération automatique des configurations
- TypeScript complet avec autocomplétion

### 🎯 UX
- Transitions fluides entre thèmes
- Persistance des préférences utilisateur
- Adaptation automatique au système

## Bonnes pratiques

### ✅ À faire
1. Utiliser `useDesignSystem()` dans vos composants
2. Préférer les classes Tailwind générées (`btn-primary`, `bg-bg-base`)
3. Utiliser les composants Naive UI qui respectent automatiquement le thème
4. Tester vos interfaces en mode light ET dark

### ❌ À éviter
1. Couleurs codées en dur dans les composants
2. Styles CSS personnalisés qui ignorent le système
3. Oublier de tester les transitions de thème
4. Créer des composants qui ne supportent qu'un seul mode

## Migration depuis l'ancien système

Si vous migrez depuis l'ancien système :

1. **Remplacer** les imports directs de tokens par `useDesignSystem()`
2. **Mettre à jour** les classes CSS pour utiliser les nouvelles classes Tailwind
3. **Tester** que vos composants fonctionnent en mode light et dark
4. **Profiter** des nouveaux presets de thèmes !

## Exemples d'utilisation avancée

### Créer un sélecteur de thème

```vue
<template>
  <div class="theme-selector">
    <select @change="setThemePreset($event.target.value)">
      <option value="default">Gaming</option>
      <option value="cyberpunk">Cyberpunk</option>
      <option value="sunset">Sunset</option>
    </select>
    
    <button @click="toggleTheme">
      {{ effectiveMode === 'dark' ? '☀️' : '🌙' }}
    </button>
  </div>
</template>
```

### Personnalisation avancée

```typescript
// Créer un thème personnalisé
const customTheme = {
  colors: {
    light: {
      primary: '#ff6b35',
      background: '#fafafa',
      // ... autres couleurs
    },
    dark: {
      primary: '#ff8c42',
      background: '#1a1a1a',
      // ... autres couleurs
    }
  }
}

// Appliquer le thème personnalisé
updateCustomTokens(customTheme)
```

Le système de theming unifié offre une expérience de développement moderne et une interface utilisateur cohérente et personnalisable ! 🎨