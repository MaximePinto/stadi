# 🎨 Système de Design Hybride

## Vue d'ensemble

Le système de design utilise une **architecture hybride** combinant classes CSS et attributs data pour une flexibilité maximale. Il repose sur des **design tokens CSS** comme source unique de vérité, avec un mapping automatique vers les classes Tailwind.

## Architecture

### 1. **Structure des fichiers**

```
design-system/styles/
├── index.css              # 📦 Point d'entrée - imports uniquement
├── tokens.css             # 🎯 Source de vérité (couleurs, spacing, etc.)
├── themes.css             # 🌈 Variations (.dark + [data-theme])
├── tailwind-theme.css     # ⚙️ Mapping tokens → classes Tailwind
└── global.css             # 🌍 Styles globaux
```

### 2. **Approche hybride**

Le système combine **deux mécanismes** pour une séparation claire des responsabilités :

#### **Classes CSS** pour le mode sombre
```html
<html class="dark">
```
```css
.dark {
  --bg: var(--slate-900);
  --text: var(--slate-100);
  --primary: var(--indigo-500);
}
```

#### **Attributs data** pour les variantes thématiques
```html
<html data-theme="gaming">
<html data-theme="ocean">
<html data-theme="forest">
```
```css
[data-theme="gaming"] {
  --primary: var(--purple-600);
  --accent: var(--indigo-600);
}
```

#### **Combinaisons** pour thèmes sombres
```html
<html class="dark" data-theme="gaming">
```
```css
.dark[data-theme="gaming"] {
  --primary: var(--purple-400);  /* Plus vif en mode sombre */
}
```

## Sources de vérité

### 1. **`tokens.css`** - Variables de base

Définit tous les **design tokens** de l'application :

```css
:root {
  /* Palette de couleurs */
  --indigo-500: #6366f1;
  --purple-600: #9333ea;
  --slate-900: #0f172a;
  
  /* Variables sémantiques */
  --primary: var(--indigo-700);
  --bg: var(--slate-50);
  --text: var(--slate-900);
  
  /* Spacing */
  --space-md: 1rem;
  --space-lg: 1.5rem;
  
  /* Border radius */
  --radius-md: 0.5rem;
}
```

### 2. **`themes.css`** - Variations thématiques

Redéfinit les variables pour le **mode sombre** et les **presets** :

```css
/* Mode sombre */
.dark {
  --bg: var(--slate-900);
  --text: var(--slate-100);
  --primary: var(--indigo-500);
}

/* Presets thématiques */
[data-theme="gaming"] {
  --primary: var(--purple-600);
}

.dark[data-theme="gaming"] {
  --primary: var(--purple-400);
}
```

### 3. **`tailwind-theme.css`** - Mapping Tailwind

Connecte les tokens CSS aux **classes Tailwind** :

```css
@theme inline {
  --color-primary: var(--primary);
  --color-background: var(--bg);
  --color-foreground: var(--text);
  --radius-md: var(--radius-md);
}
```

## Store Pinia

### **`useThemeStore`** - Gestion d'état

```typescript
export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('light')
  const preset = ref<ThemePreset>('indigo')
  
  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode
    applyTheme()
  }
  
  const setPreset = (newPreset: ThemePreset) => {
    preset.value = newPreset
    applyTheme()
  }
  
  const applyTheme = () => {
    const root = document.documentElement
    
    // Applique le mode (classe CSS)
    root.classList.remove('light', 'dark')
    root.classList.add(mode.value)
    
    // Applique le preset (data attribute)  
    root.dataset.theme = preset.value
  }
})
```

## Thèmes disponibles

### **Presets intégrés**

| Preset   | Couleur principale | Style        | Usage recommandé  |
|----------|-------------------|--------------|-------------------|
| `indigo` | Indigo (#4338ca)  | Défaut       | Interface générale |
| `gaming` | Purple (#9333ea)  | Gaming       | Mode jeu          |
| `ocean`  | Cyan (#0891b2)    | Océan        | Thème bleu        |
| `forest` | Emerald (#059669) | Nature       | Thème vert        |

### **Modes**

- **`light`** : Mode clair (défaut)
- **`dark`** : Mode sombre avec couleurs adaptées

## Utilisation

### **Dans les composants Vue**

```vue
<template>
  <div class="bg-background text-foreground">
    <button class="bg-primary hover:bg-primary-hover">
      Mon bouton
    </button>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Changer de thème
const switchToGaming = () => themeStore.setPreset('gaming')
const toggleDark = () => themeStore.toggleMode()
</script>
```

### **Classes Tailwind disponibles**

```html
<!-- Couleurs de base -->
<div class="bg-background text-foreground border-border">

<!-- Couleurs sémantiques -->
<button class="bg-primary text-primary-foreground hover:bg-primary-hover">
<div class="bg-surface hover:bg-surface-hover">

<!-- États -->
<span class="text-success">Succès</span>
<span class="text-error">Erreur</span>

<!-- Mode sombre automatique -->
<div class="bg-white dark:bg-slate-900 text-black dark:text-white">
```

### **Changement programmatique**

```javascript
// Mode sombre
document.documentElement.classList.add('dark')

// Thème gaming
document.documentElement.setAttribute('data-theme', 'gaming')

// Combinaison : gaming sombre
document.documentElement.className = 'dark'
document.documentElement.setAttribute('data-theme', 'gaming')
```

## Avantages du système hybride

### ✅ **Classes CSS** (`.dark`)
- **Familier** : Standard industrie
- **Simple** : `classList.toggle('dark')`
- **Compatible** : Tailwind, frameworks
- **Performance** : Spécificité CSS optimale

### ✅ **Attributs data** (`data-theme="gaming"`)
- **Sémantique** : Intention claire
- **Pas de conflits** : Namespace séparé
- **Validation** : HTML5 standard
- **État applicatif** : Un seul attribut à gérer

### ✅ **Combinaison**
- **Séparation** : Mode vs. variante thématique
- **Flexibilité** : 4 thèmes × 2 modes = 8 combinaisons
- **Évolutivité** : Ajout facile de nouveaux presets
- **Spécificité CSS** : `.dark[data-theme="gaming"]` priorité maximale

## Directive Tailwind v4

```css
@custom-variant dark (&:is(.dark *));
```

Cette directive permet d'utiliser `dark:` dans les classes Tailwind :
- `dark:bg-black` = `background: black` si élément dans `.dark`
- Plus performant que les media queries
- Compatible avec l'approche hybride

Le système hybride offre le **meilleur des deux mondes** : simplicité des classes + sémantique des attributs data ! 🎨