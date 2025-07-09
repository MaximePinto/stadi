# 🎨 Composants Design System

Cette section contient tous les composants réutilisables du design system unifié.

## 📦 Composants disponibles

### DsButton
Bouton avec effets gaming et support complet du système de thèmes.

```vue
<DsButton 
  text="Mon bouton"
  variant="primary"
  size="medium"
  :gaming="true"
  @click="handleClick"
/>
```

### DsCard
Carte simple avec support des thèmes.

```vue
<DsCard>
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte</p>
</DsCard>
```

### DsInput
Champ de saisie avec validation et thèmes.

```vue
<DsInput
  v-model="value"
  placeholder="Saisir du texte"
  :error="hasError"
  error-message="Message d'erreur"
/>
```

### DsThemeSelector ⭐ **NOUVEAU**
Sélecteur de thème unifié avec support des presets et modes.

## 🎯 DsThemeSelector

Le composant `DsThemeSelector` est le cœur du système de theming. Il permet aux utilisateurs de changer facilement de thème et de mode.

### Utilisation basique

```vue
<template>
  <DsThemeSelector />
</template>

<script setup>
import { DsThemeSelector } from '@/design-system/components'
</script>
```

### Props disponibles

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `showModeToggle` | `boolean` | `true` | Afficher les boutons de mode (light/dark/auto) |
| `showPresetSelector` | `boolean` | `true` | Afficher le sélecteur de presets |
| `showAdvanced` | `boolean` | `false` | Afficher le bouton des paramètres avancés |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille des composants |
| `compact` | `boolean` | `false` | Layout compact (vertical) |
| `gaming` | `boolean` | `true` | Activer les effets gaming |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `mode-change` | `'light' \| 'dark' \| 'auto'` | Mode de thème changé |
| `preset-change` | `string` | Preset de thème changé |
| `theme-change` | `object` | Tout changement de thème |

### Exemples d'utilisation

#### Sélecteur compact pour header
```vue
<DsThemeSelector 
  :compact="true"
  :size="'small'"
  :show-advanced="false"
/>
```

#### Sélecteur complet avec paramètres avancés
```vue
<DsThemeSelector 
  :show-advanced="true"
  :gaming="true"
  @mode-change="handleModeChange"
  @preset-change="handlePresetChange"
/>
```

#### Sélecteur mode uniquement
```vue
<DsThemeSelector 
  :show-preset-selector="false"
  :show-advanced="false"
/>
```

#### Sélecteur preset uniquement
```vue
<DsThemeSelector 
  :show-mode-toggle="false"
  :show-advanced="false"
/>
```

### Intégration dans le header

```vue
<template>
  <header class="app-header">
    <nav>
      <!-- Navigation -->
      <div class="nav-links">
        <RouterLink to="/">Accueil</RouterLink>
        <!-- ... autres liens -->
      </div>
      
      <!-- Actions utilisateur -->
      <div class="user-actions">
        <DsThemeSelector 
          :compact="true"
          :size="'small'"
          :show-advanced="false"
          class="header-theme-selector"
        />
        <button @click="logout">Déconnexion</button>
      </div>
    </nav>
  </header>
</template>
```

### Styles personnalisés

Le composant utilise les variables CSS du design system et peut être personnalisé :

```css
/* Personnalisation pour le header */
.header-theme-selector {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.header-theme-selector:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}
```

## 🚀 Bonnes pratiques

### ✅ À faire
1. Utiliser `DsThemeSelector` dans les zones d'administration des thèmes
2. Préférer la version compacte pour les headers et toolbars
3. Écouter les événements pour synchroniser l'état de l'application
4. Tester le composant en mode light et dark

### ❌ À éviter
1. Créer plusieurs sélecteurs de thème sur la même page
2. Ignorer les événements émis par le composant
3. Modifier directement l'état du thème sans passer par le composant
4. Oublier de tester la responsivité

## 🎨 Personnalisation avancée

### Créer un sélecteur personnalisé

```vue
<template>
  <div class="custom-theme-selector">
    <DsThemeSelector 
      :show-mode-toggle="false"
      :show-preset-selector="true"
      :gaming="false"
      @preset-change="handleCustomPresetChange"
    />
    
    <!-- Contrôles personnalisés -->
    <div class="custom-controls">
      <button @click="resetTheme">Reset</button>
      <button @click="exportTheme">Exporter</button>
    </div>
  </div>
</template>

<script setup>
import { DsThemeSelector } from '@/design-system/components'
import { useDesignSystem } from '@/composables/useDesignSystem'

const { resetCustomizations, exportThemeConfig } = useDesignSystem()

const handleCustomPresetChange = (preset) => {
  console.log('Preset personnalisé:', preset)
}

const resetTheme = () => {
  resetCustomizations()
}

const exportTheme = () => {
  const config = exportThemeConfig()
  console.log('Configuration exportée:', config)
}
</script>
```

Le composant `DsThemeSelector` s'intègre parfaitement dans le système de design unifié et offre une expérience utilisateur cohérente et moderne ! 🎨✨ 