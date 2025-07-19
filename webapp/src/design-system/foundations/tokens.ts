/**
 * 🎨 Design Tokens - Adaptés à tes couleurs actuelles
 *
 * Basé sur ton tailwind.preset.js existant avec :
 * - primary: '#4338ca' (indigo-700)
 * - secondary: '#334155' (slate-700)
 * - Style "gaming" sombre
 */

// ================================
// 1. IMPORT DES INTERFACES
// ================================

import type {
  ColorScaleInterface,
  SemanticColorsInterface,
  TypographyScaleInterface,
  SpacingScaleInterface,
  BorderRadiusInterface,
  ShadowsInterface,
  DesignTokensInterface,
  ThemePresetInterface
} from '../interfaces'

// ================================
// 2. PALETTES BASÉES SUR TES COULEURS
// ================================

// Palette indigo (tes couleurs primaires actuelles)
const indigo: ColorScaleInterface = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',  // ton primary-hover actuel
  700: '#4338ca',  // ton primary actuel
  800: '#3730a3',
  900: '#312e81',
  950: '#1e1b4b'
}

// Palette slate (tes couleurs secondaires actuelles)
const slate: ColorScaleInterface = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',  // ton textBase actuel
  300: '#cbd5e1',
  400: '#94a3b8',  // ton textMuted actuel
  500: '#64748b',
  600: '#475569',  // ton secondary-hover actuel
  700: '#334155',  // ton secondary actuel
  800: '#1e293b',  // ton neutral actuel
  900: '#0f172a',  // ton neutral.dark actuel
  950: '#020617'
}

// Autres palettes pour les couleurs sémantiques
const blue: ColorScaleInterface = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  // primary-gradient-start
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554'
}

const emerald: ColorScaleInterface = {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
  950: '#022c22'
}

const amber: ColorScaleInterface = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03'
}

const red: ColorScaleInterface = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a'
}

const purple: ColorScaleInterface = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7c3aed',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764'
}

// ================================
// 3. TOKENS ADAPTÉS À TON STYLE
// ================================

export const designTokens: DesignTokensInterface = {
  colors: {
    // ================================
    // MODE CLAIR - Style gaming adapté
    // ================================
    light: {
      // Couleurs primaires (tes couleurs exactes)
      primary: indigo[700],        // indigo-700 (ton primary)
      primaryHover: indigo[600],   // indigo-600 (ton primary-hover)
      primaryPressed: indigo[800], // indigo-800 (plus sombre)
      primaryDisabled: indigo[300], // indigo-300 (désactivé)

      // Couleurs secondaires (adaptées au preset)
      secondary: indigo[100],      // Variante claire du primary pour cohérence
      secondaryHover: indigo[200], // Plus foncé au hover
      secondaryPressed: indigo[300], // Plus foncé au clic
      
      // Couleurs de surface et accent
      surface: slate[50],          // Surface claire
      text: slate[900],           // Texte principal sombre
      accent: purple[600],        // Couleur d'accent

      // Couleurs sémantiques (adaptées au mode clair)
      info: blue[600],           // Plus foncé pour meilleur contraste
      infoHover: blue[700],      // Plus sombre au hover
      infoPressed: blue[800],    // Plus sombre au clic
      success: emerald[600],     // Plus foncé pour meilleur contraste
      successHover: emerald[700], // Plus sombre au hover
      successPressed: emerald[800], // Plus sombre au clic
      warning: amber[600],       // Plus foncé pour meilleur contraste
      warningHover: amber[700],  // Plus sombre au hover
      warningPressed: amber[800], // Plus sombre au clic
      error: red[600],           // Plus foncé pour meilleur contraste
      errorHover: red[700],      // Plus sombre au hover
      errorPressed: red[800],    // Plus sombre au clic

      // Texte (optimisé pour le contraste en mode clair)
      textPrimary: slate[900],   // Sombre pour lisibilité maximale
      textSecondary: slate[700], // Plus sombre pour meilleur contraste
      textDisabled: slate[400],  // Assez clair pour indiquer l'état désactivé

      // Arrière-plans (optimisés pour le contraste)
      background: slate[50],     // Blanc pur
      backgroundSoft: slate[100], // Très léger
      backgroundMute: slate[200], // Légèrement gris

      // Bordures (contraste amélioré)
      border: slate[300],        // Plus visible
      borderHover: slate[400],   // Contraste plus marqué au hover
      borderFocus: indigo[500],  // Focus avec ta couleur primaire
    },

    // ================================
    // MODE SOMBRE - Ton style gaming
    // ================================
    dark: {
      // Couleurs primaires (plus vives pour le mode sombre)
      primary: indigo[500],        // indigo-500 (plus vif)
      primaryHover: indigo[400],   // indigo-400 (encore plus vif au hover)
      primaryPressed: indigo[500], // indigo-500 (retour à la base, effet de "click")
      primaryDisabled: indigo[800], // indigo-800 (très sombre)

      // Couleurs secondaires (adaptées au preset)
      secondary: indigo[900],      // Variante sombre du primary pour cohérence
      secondaryHover: indigo[800], // Plus clair au hover (mode sombre)
      secondaryPressed: indigo[900], // Retour à la base
      
      // Couleurs de surface et accent
      surface: slate[800],         // Surface sombre
      text: slate[100],           // Texte principal clair
      accent: purple[400],        // Couleur d'accent adaptée au sombre

      // Couleurs sémantiques (adaptées au mode sombre)
      info: blue[400],
      infoHover: blue[300],        // Plus vif au hover
      infoPressed: blue[500],      // Plus sombre au clic
      success: emerald[400],
      successHover: emerald[300],  // Plus vif au hover
      successPressed: emerald[500], // Plus sombre au clic
      warning: amber[400],
      warningHover: amber[300],    // Plus vif au hover
      warningPressed: amber[500],  // Plus sombre au clic
      error: red[400],
      errorHover: red[300],        // Plus vif au hover
      errorPressed: red[500],      // Plus sombre au clic

      // Texte (optimisé pour le contraste en mode sombre)
      textPrimary: slate[100],    // Plus clair pour meilleur contraste
      textSecondary: slate[300],  // Plus clair que l'original
      textDisabled: slate[600],   // Assez sombre pour indiquer l'état désactivé

      // Arrière-plans (ton style gaming)
      background: slate[900],     // ton neutral.dark
      backgroundSoft: slate[800], // ton neutral par défaut
      backgroundMute: slate[700], // ton neutral.light

      // Bordures (optimisées pour le mode sombre)
      border: slate[600],        // Plus clair pour meilleur contraste
      borderHover: slate[500],   // Plus clair au hover
      borderFocus: indigo[400],  // Focus vif
    }
  },

  // ================================
  // TYPOGRAPHIE (basée sur tes tokens)
  // ================================
  typography: {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },      // Conservé
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },  // text-sm de tes boutons
    base: { fontSize: '1rem', lineHeight: '1.5rem' },     // text-base de tes boutons
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },  // text-lg de tes boutons
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },   // Étendu
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },    // Étendu
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' }, // Étendu
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' }   // Étendu
  },

  // ================================
  // ESPACEMENT (basé sur tes tokens boutons)
  // ================================
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px - ton btn-py-sm et p-sm
    md: '1rem',      // 16px - ton p-md et btn-px-sm
    lg: '1.5rem',    // 24px - ton p-lg et btn-px-md
    xl: '2rem',      // 32px - ton p-xl et btn-px-lg
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
    '4xl': '4rem'    // 64px
  },

  // ================================
  // BORDER RADIUS (tes valeurs)
  // ================================
  borderRadius: {
    none: '0',
    sm: '0.25rem',     // ton sm
    md: '0.5rem',      // ton DEFAULT et md (rounded-lg)
    lg: '0.75rem',     // ton lg
    xl: '1rem',        // Étendu
    full: '9999px'     // ton full
  },

  // ================================
  // OMBRES (tes glows + standards)
  // ================================
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(67, 56, 202, 0.3)',        // Glow avec ta couleur primaire
    glowPrimary: '0 0 20px rgba(79, 70, 229, 0.6)', // Ton glow-primary actuel
    glowSecondary: '0 0 20px rgba(71, 85, 105, 0.5)' // Ton glow-secondary actuel
  },

  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  }
}

// ================================
// 4. PRESETS ÉTENDUS AVEC TON STYLE
// ================================

export const themePresets: Record<string, ThemePresetInterface> = {
  // Ton thème actuel comme default
  default: {
    name: 'Gaming Indigo',
    displayName: 'Gaming Indigo',
    description: 'Ton thème actuel - Style gaming avec indigo et slate',
    tokens: designTokens
  },

  // Variations basées sur ton style
  cyberpunk: {
    name: 'Cyberpunk',
    displayName: 'Cyberpunk',
    description: 'Style gaming futuriste avec purple et neon',
    tokens: {
      ...designTokens,
      colors: {
        light: {
          ...designTokens.colors.light,
          primary: purple[600],
          primaryHover: purple[500],
          primaryPressed: purple[700]
        },
        dark: {
          ...designTokens.colors.dark,
          primary: purple[400],
          primaryHover: purple[300],
          primaryPressed: purple[500]
        }
      }
    }
  },

  ocean: {
    name: 'Ocean Gaming',
    displayName: 'Ocean Gaming',
    description: 'Style gaming avec des bleus océan',
    tokens: {
      ...designTokens,
      colors: {
        light: {
          ...designTokens.colors.light,
          primary: blue[600],
          primaryHover: blue[500],
          primaryPressed: blue[700]
        },
        dark: {
          ...designTokens.colors.dark,
          primary: blue[400],
          primaryHover: blue[300],
          primaryPressed: blue[500]
        }
      }
    }
  },

  forest: {
    name: 'Forest Gaming',
    displayName: 'Forest Gaming',
    description: 'Style gaming avec des verts nature',
    tokens: {
      ...designTokens,
      colors: {
        light: {
          ...designTokens.colors.light,
          primary: emerald[600],
          primaryHover: emerald[500],
          primaryPressed: emerald[700]
        },
        dark: {
          ...designTokens.colors.dark,
          primary: emerald[400],
          primaryHover: emerald[300],
          primaryPressed: emerald[500]
        }
      }
    }
  }
}

// ================================
// 5. UTILITAIRES (identiques)
// ================================

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function withOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex)
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : hex
}

export function getTokensForPreset(preset = 'default'): DesignTokensInterface {
  return themePresets[preset]?.tokens || designTokens;
}
