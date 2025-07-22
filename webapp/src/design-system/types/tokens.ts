/**
 * Design Tokens Types - Consolidated
 * Regroupe tous les types liés aux design tokens du système
 */

// ============================================================================
// ÉCHELLES DE BASE
// ============================================================================

/**
 * Échelle de couleurs standard (50-950)
 */
export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

/**
 * Échelle d'espacement
 */
export interface SpacingScale {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

/**
 * Échelle typographique
 */
export interface TypographyScale {
  fontSize: string
  lineHeight: string
}

/**
 * Rayons de bordure
 */
export interface BorderRadius {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

/**
 * Ombres
 */
export interface Shadows {
  sm: string
  md: string
  lg: string
  xl: string
  glow: string
  glowPrimary: string
  glowSecondary: string
}

// ============================================================================
// COULEURS SÉMANTIQUES
// ============================================================================

/**
 * Couleurs sémantiques pour un mode (light/dark)
 */
export interface SemanticColors {
  // Layout
  layout: {
    background: string
    surface: string
    surfaceHover: string
    surfaceActive: string
    text: string
  }

  // Texte
  text: {
    primary: string
    secondary: string
    disabled: string
  }

  // Bordures
  border: {
    border: string
    borderHover: string
    borderFocus: string
  }

  // Couleurs primaires
  primary: {
    primary: string
    primaryHover: string
    primaryPressed: string
    primaryDisabled: string
    onPrimary: string
  }

  // Couleurs secondaires
  secondary: {
    secondary: string
    secondaryHover: string
    secondaryPressed: string
    secondaryDisabled: string
    onSecondary: string
  }

  // Couleurs d'accent
  accent: {
    accent: string
    accentHover: string
    accentPressed: string
    accentDisabled: string
    onAccent: string
  }

  // États
  success: {
    success: string
    successHover: string
    successPressed: string
    onSuccess: string
  }

  warning: {
    warning: string
    warningHover: string
    warningPressed: string
    onWarning: string
  }

  error: {
    error: string
    errorHover: string
    errorPressed: string
    onError: string
  }

  info: {
    info: string
    infoHover: string
    infoPressed: string
    onInfo: string
  }
}

// ============================================================================
// TOKENS PRINCIPAUX
// ============================================================================

/**
 * Interface principale des design tokens
 */
export interface DesignTokens {
  colors: {
    light: SemanticColors
    dark: SemanticColors
  }
  typography: {
    h1: TypographyScale
    h2: TypographyScale
    h3: TypographyScale
    h4: TypographyScale
    h5: TypographyScale
    h6: TypographyScale
    body: TypographyScale
    caption: TypographyScale
  }
  spacing: SpacingScale
  borderRadius: BorderRadius
  shadows: Shadows
  transitions: {
    fast: string
    normal: string
    slow: string
  }
}

/**
 * Preset de thème
 */
export interface ThemePreset {
  name: string
  displayName: string
  description: string
  tokens: DesignTokens
}