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
  ColorScale,
  SemanticColors,
  TypographyScale,
  SpacingScale,
  BorderRadius,
  Shadows,
  DesignTokens,
  ThemePreset
} from '../types'

// ================================
// 2. PALETTES BASÉES SUR TES COULEURS
// ================================

// Palette indigo (tes couleurs primaires actuelles)
const indigo: ColorScale = {
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
const slate: ColorScale = {
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
const blue: ColorScale = {
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

const emerald: ColorScale = {
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

const amber: ColorScale = {
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

const red: ColorScale = {
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

const purple: ColorScale = {
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

export const designTokens: DesignTokens = {
  colors: {
    // ================================
    // MODE CLAIR - Style gaming adapté
    // ================================
    light: {
      // Layout
      background: slate[50],      // Arrière-plan principal
      backgroundSoft: slate[100], // Arrière-plan doux
      backgroundMute: slate[200], // Arrière-plan atténué
      surface: slate[50],         // Surface principale
      surfaceHover: slate[100],   // Surface au hover
      surfaceActive: slate[200],  // Surface active

      // Texte
      textPrimary: slate[900],    // Texte principal
      textSecondary: slate[700],  // Texte secondaire
      textDisabled: slate[400],   // Texte désactivé

      // Bordures
      border: slate[300],         // Bordure par défaut
      borderHover: slate[400],    // Bordure au hover
      borderFocus: indigo[500],   // Bordure en focus

      // Couleurs primaires
      primaryBase: indigo[700],     // Couleur primaire de base
      primaryHover: indigo[600],    // Primaire au hover
      primaryPressed: indigo[800],  // Primaire pressé
      primaryDisabled: indigo[300], // Primaire désactivé
      onPrimary: slate[50],         // Texte sur primaire

      // Couleurs secondaires
      secondaryBase: indigo[100],    // Secondaire de base
      secondaryHover: indigo[200],   // Secondaire au hover
      secondaryPressed: indigo[300], // Secondaire pressé
      secondaryDisabled: indigo[50], // Secondaire désactivé
      onSecondary: slate[900],       // Texte sur secondaire

      // Couleurs d'accent
      accentBase: purple[600],      // Accent de base
      accentHover: purple[500],     // Accent au hover
      accentPressed: purple[700],   // Accent pressé
      accentDisabled: purple[300],  // Accent désactivé
      onAccent: slate[50],          // Texte sur accent

      // États - Success
      successBase: emerald[600],     // Success de base
      successHover: emerald[700],    // Success au hover
      successPressed: emerald[800],  // Success pressé
      onSuccess: slate[50],          // Texte sur success

      // États - Warning
      warningBase: amber[600],       // Warning de base
      warningHover: amber[700],      // Warning au hover
      warningPressed: amber[800],    // Warning pressé
      onWarning: slate[50],          // Texte sur warning

      // États - Error
      errorBase: red[600],           // Error de base
      errorHover: red[700],          // Error au hover
      errorPressed: red[800],        // Error pressé
      onError: slate[50],            // Texte sur error

      // États - Info
      infoBase: blue[600],           // Info de base
      infoHover: blue[700],          // Info au hover
      infoPressed: blue[800],        // Info pressé
      onInfo: slate[50],             // Texte sur info
    },

    // ================================
    // MODE SOMBRE - Ton style gaming
    // ================================
    dark: {
      // Layout
      background: slate[900],     // Arrière-plan principal sombre
      backgroundSoft: slate[800], // Arrière-plan doux sombre
      backgroundMute: slate[700], // Arrière-plan atténué sombre
      surface: slate[800],        // Surface principale sombre
      surfaceHover: slate[700],   // Surface au hover sombre
      surfaceActive: slate[600],  // Surface active sombre

      // Texte
      textPrimary: slate[100],    // Texte principal clair
      textSecondary: slate[300],  // Texte secondaire clair
      textDisabled: slate[600],   // Texte désactivé sombre

      // Bordures
      border: slate[600],         // Bordure par défaut sombre
      borderHover: slate[500],    // Bordure au hover sombre
      borderFocus: indigo[400],   // Bordure en focus vive

      // Couleurs primaires
      primaryBase: indigo[500],     // Couleur primaire de base vive
      primaryHover: indigo[400],    // Primaire au hover plus vif
      primaryPressed: indigo[600],  // Primaire pressé plus sombre
      primaryDisabled: indigo[800], // Primaire désactivé sombre
      onPrimary: slate[50],         // Texte sur primaire

      // Couleurs secondaires
      secondaryBase: indigo[900],    // Secondaire de base sombre
      secondaryHover: indigo[800],   // Secondaire au hover plus clair
      secondaryPressed: indigo[950], // Secondaire pressé plus sombre
      secondaryDisabled: slate[800], // Secondaire désactivé
      onSecondary: slate[100],       // Texte sur secondaire

      // Couleurs d'accent
      accentBase: purple[400],      // Accent de base vif
      accentHover: purple[300],     // Accent au hover plus vif
      accentPressed: purple[500],   // Accent pressé plus sombre
      accentDisabled: purple[800],  // Accent désactivé sombre
      onAccent: slate[50],          // Texte sur accent

      // États - Success
      successBase: emerald[400],     // Success de base vif
      successHover: emerald[300],    // Success au hover plus vif
      successPressed: emerald[500],  // Success pressé plus sombre
      onSuccess: slate[50],          // Texte sur success

      // États - Warning
      warningBase: amber[400],       // Warning de base vif
      warningHover: amber[300],      // Warning au hover plus vif
      warningPressed: amber[500],    // Warning pressé plus sombre
      onWarning: slate[50],          // Texte sur warning

      // États - Error
      errorBase: red[400],           // Error de base vif
      errorHover: red[300],          // Error au hover plus vif
      errorPressed: red[500],        // Error pressé plus sombre
      onError: slate[50],            // Texte sur error

      // États - Info
      infoBase: blue[400],           // Info de base vif
      infoHover: blue[300],          // Info au hover plus vif
      infoPressed: blue[500],        // Info pressé plus sombre
      onInfo: slate[50],             // Texte sur info
    }
  },

  // ================================
  // TYPOGRAPHIE (basée sur tes tokens)
  // ================================
  typography: {
    h1: { fontSize: '2.25rem', lineHeight: '2.5rem' },     // 36px
    h2: { fontSize: '1.875rem', lineHeight: '2.25rem' },   // 30px
    h3: { fontSize: '1.5rem', lineHeight: '2rem' },        // 24px
    h4: { fontSize: '1.25rem', lineHeight: '1.75rem' },    // 20px
    h5: { fontSize: '1.125rem', lineHeight: '1.75rem' },   // 18px
    h6: { fontSize: '1rem', lineHeight: '1.5rem' },        // 16px
    body: { fontSize: '1rem', lineHeight: '1.5rem' },      // 16px - texte principal
    caption: { fontSize: '0.875rem', lineHeight: '1.25rem' } // 14px - légendes et textes secondaires
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

export const themePresets: Record<string, ThemePreset> = {
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
          primaryBase: purple[600],
          primaryHover: purple[500],
          primaryPressed: purple[700]
        },
        dark: {
          ...designTokens.colors.dark,
          primaryBase: purple[400],
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
          primaryBase: blue[600],
          primaryHover: blue[500],
          primaryPressed: blue[700]
        },
        dark: {
          ...designTokens.colors.dark,
          primaryBase: blue[400],
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
          primaryBase: emerald[600],
          primaryHover: emerald[500],
          primaryPressed: emerald[700]
        },
        dark: {
          ...designTokens.colors.dark,
          primaryBase: emerald[400],
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

export function getTokensForPreset(preset = 'default'): DesignTokens {
  return themePresets[preset]?.tokens || designTokens;
}
