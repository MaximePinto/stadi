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
  background: string
  backgroundSoft: string
  backgroundMute: string
  surface: string
  surfaceHover: string
  surfaceActive: string

  // Texte
  textPrimary: string
  textSecondary: string
  textDisabled: string

  // Bordures
  border: string
  borderHover: string
  borderFocus: string

  // Couleurs primaires
  primaryBase: string
  primaryHover: string
  primaryPressed: string
  primaryDisabled: string
  onPrimary: string

  // Couleurs secondaires
  secondaryBase: string
  secondaryHover: string
  secondaryPressed: string
  secondaryDisabled: string
  onSecondary: string

  // Couleurs d'accent
  accentBase: string
  accentHover: string
  accentPressed: string
  accentDisabled: string
  onAccent: string

  // États
  successBase: string
  successHover: string
  successPressed: string
  onSuccess: string

  warningBase: string
  warningHover: string
  warningPressed: string
  onWarning: string

  errorBase: string
  errorHover: string
  errorPressed: string
  onError: string

  infoBase: string
  infoHover: string
  infoPressed: string
  onInfo: string
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