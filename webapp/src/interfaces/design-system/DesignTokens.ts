import type { SemanticColors } from './SemanticColors'
import type { TypographyScale } from './TypographyScale'
import type { SpacingScale } from './SpacingScale'
import type { BorderRadius } from './BorderRadius'
import type { Shadows } from './Shadows'

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
