import type { DesignTokensInterface } from './DesignTokensInterface'

export interface ThemePresetInterface {
  name: string
  displayName: string
  description?: string
  tokens: DesignTokensInterface
}