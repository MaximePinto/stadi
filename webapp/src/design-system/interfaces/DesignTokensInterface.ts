import type { SemanticColorsInterface } from './SemanticColorsInterface'
import type { TypographyScaleInterface } from './TypographyScaleInterface'
import type { SpacingScaleInterface } from './SpacingScaleInterface'
import type { BorderRadiusInterface } from './BorderRadiusInterface'
import type { ShadowsInterface } from './ShadowsInterface'

export interface DesignTokensInterface {
  colors: {
    light: SemanticColorsInterface
    dark: SemanticColorsInterface
  }
  typography: TypographyScaleInterface
  spacing: SpacingScaleInterface
  borderRadius: BorderRadiusInterface
  shadows: ShadowsInterface
  transitions: {
    fast: string
    normal: string
    slow: string
  }
}