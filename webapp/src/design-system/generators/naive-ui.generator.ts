/**
 * 🎨 Générateur de thème Naive UI à partir des design tokens
 *
 * Ce fichier génère automatiquement les overrides Naive UI
 * basés sur les tokens définis dans tokens.ts
 */

import { type GlobalThemeOverrides } from 'naive-ui'
import { designTokens } from '../foundations/tokens'
import type { DesignTokens, SemanticColors } from '../types'

/**
 * Génère les overrides Naive UI pour un mode donné
 */
export function generateNaiveUIThemeOverrides(
  mode: 'light' | 'dark' = 'light',
  customTokens?: DesignTokens
): GlobalThemeOverrides {
  const tokens = customTokens || designTokens
  const colors = tokens.colors[mode]

  return {
    // ================================
    // VARIABLES COMMUNES
    // ================================
    common: {
      // Couleurs primaires
      primaryColor: colors.primary,
      primaryColorHover: colors.primaryHover,
      primaryColorPressed: colors.primaryPressed,
      primaryColorSuppl: colors.primary,

      // Couleurs d'information
      infoColor: colors.info,
      infoColorHover: colors.infoHover,
      infoColorPressed: colors.infoPressed,
      infoColorSuppl: colors.info,

      // Couleurs de succès
      successColor: colors.success,
      successColorHover: colors.successHover,
      successColorPressed: colors.successPressed,
      successColorSuppl: colors.success,

      // Couleurs d'avertissement
      warningColor: colors.warning,
      warningColorHover: colors.warningHover,
      warningColorPressed: colors.warningPressed,
      warningColorSuppl: colors.warning,

      // Couleurs d'erreur
      errorColor: colors.error,
      errorColorHover: colors.errorHover,
      errorColorPressed: colors.errorPressed,
      errorColorSuppl: colors.error,

      // Couleurs de texte
      textColorBase: colors.textPrimary,
      textColor1: colors.textPrimary,
      textColor2: colors.textSecondary,
      textColor3: colors.textDisabled,
      textColorDisabled: colors.textDisabled,
      placeholderColor: colors.textDisabled,

      // Couleurs d'arrière-plan
      bodyColor: colors.background,
      cardColor: colors.backgroundSoft,
      modalColor: colors.backgroundSoft,
      popoverColor: colors.backgroundSoft,
      tableHeaderColor: colors.backgroundMute,

      // Couleurs de bordure
      borderColor: colors.border,
      dividerColor: colors.border,

      // Radius et autres
      borderRadius: tokens.borderRadius.md,
      borderRadiusSmall: tokens.borderRadius.sm,

      // Hauteur des composants
      heightTiny: '22px',
      heightSmall: '28px',
      heightMedium: '34px',
      heightLarge: '40px',
      heightHuge: '46px',

      // Famille de police
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',

      // Taille de police
      fontSize: tokens.typography.base.fontSize,
      fontSizeMini: tokens.typography.xs.fontSize,
      fontSizeTiny: tokens.typography.sm.fontSize,
      fontSizeSmall: tokens.typography.sm.fontSize,
      fontSizeMedium: tokens.typography.base.fontSize,
      fontSizeLarge: tokens.typography.lg.fontSize,
      fontSizeHuge: tokens.typography.xl.fontSize,

      // Hauteur de ligne
      lineHeight: tokens.typography.base.lineHeight,

      // Z-index
      zIndexBase: 'auto',
      zIndexPopover: '1000',
      zIndexModal: '1001',
      zIndexMessage: '1002',
    },

    // ================================
    // BOUTONS
    // ================================
    Button: {
      // Couleurs de texte adaptatives
      textColor: colors.textPrimary,
      textColorHover: colors.textPrimary,
      textColorPressed: colors.textPrimary,
      textColorFocus: colors.textPrimary,
      textColorDisabled: colors.textDisabled,

      // Couleurs de fond selon les variantes
      color: colors.backgroundSoft,
      colorHover: colors.backgroundMute,
      colorPressed: colors.backgroundMute,
      colorFocus: colors.backgroundSoft,
      colorDisabled: colors.backgroundMute,

      // Bordures adaptatives
      border: `1px solid ${colors.border}`,
      borderHover: `1px solid ${colors.borderHover}`,
      borderPressed: `1px solid ${colors.border}`,
      borderFocus: `1px solid ${colors.borderFocus}`,
      borderDisabled: `1px solid ${colors.border}`,

      // Geometry
      borderRadius: tokens.borderRadius.md,
      borderRadiusSmall: tokens.borderRadius.sm,
      borderRadiusLarge: tokens.borderRadius.lg,

      // Heights
      heightTiny: '24px',
      heightSmall: '32px',
      heightMedium: '40px',
      heightLarge: '48px',

      // Padding
      paddingTiny: `0 ${tokens.spacing.sm}`,
      paddingSmall: `0 ${tokens.spacing.md}`,
      paddingMedium: `0 ${tokens.spacing.lg}`,
      paddingLarge: `0 ${tokens.spacing.xl}`,

      // Fonts
      fontWeight: '500',
      fontWeightStrong: '600',
    },

    // ================================
    // INPUTS
    // ================================
    Input: {
      textColor: colors.textPrimary,
      textColorDisabled: colors.textDisabled,
      placeholderColor: colors.textDisabled,
      placeholderColorDisabled: colors.textDisabled,

      color: colors.background,
      colorDisabled: colors.backgroundMute,
      colorFocus: colors.background,

      border: `1px solid ${colors.border}`,
      borderHover: `1px solid ${colors.borderHover}`,
      borderDisabled: `1px solid ${colors.border}`,
      borderFocus: `1px solid ${colors.borderFocus}`,

      borderRadius: tokens.borderRadius.md,

      heightTiny: '24px',
      heightSmall: '32px',
      heightMedium: '40px',
      heightLarge: '48px',

      paddingTiny: `0 ${tokens.spacing.sm}`,
      paddingSmall: `0 ${tokens.spacing.md}`,
      paddingMedium: `0 ${tokens.spacing.md}`,
      paddingLarge: `0 ${tokens.spacing.lg}`,

      fontSize: tokens.typography.base.fontSize,
      fontSizeTiny: tokens.typography.xs.fontSize,
      fontSizeSmall: tokens.typography.sm.fontSize,
      fontSizeMedium: tokens.typography.base.fontSize,
      fontSizeLarge: tokens.typography.lg.fontSize,
    },

    // ================================
    // CARTES
    // ================================
    Card: {
      color: colors.backgroundSoft,
      colorModal: colors.backgroundSoft,
      colorEmbedded: colors.backgroundMute,
      colorHover: colors.backgroundSoft,

      borderColor: colors.border,
      borderRadius: tokens.borderRadius.lg,

      titleTextColor: colors.textPrimary,
      titleFontWeight: '600',
      titleFontSize: tokens.typography.lg.fontSize,

      paddingSmall: tokens.spacing.md,
      paddingMedium: tokens.spacing.lg,
      paddingLarge: tokens.spacing.xl,
      paddingHuge: tokens.spacing['2xl'],

      actionColor: colors.textSecondary,
    },

    // ================================
    // SELECTS
    // ================================
    Select: {
      peers: {
        InternalSelection: {
          textColor: colors.textPrimary,
          placeholderColor: colors.textDisabled,
          color: colors.background,
          colorActive: colors.background,
          border: `1px solid ${colors.border}`,
          borderHover: `1px solid ${colors.borderHover}`,
          borderActive: `1px solid ${colors.borderFocus}`,
          borderFocus: `1px solid ${colors.borderFocus}`,
          borderRadius: tokens.borderRadius.md,
          arrowColor: colors.textSecondary,
        },
        InternalSelectMenu: {
          color: colors.backgroundSoft,
          optionTextColor: colors.textPrimary,
          optionTextColorActive: colors.textPrimary,
          optionCheckColor: colors.primary,
          borderRadius: tokens.borderRadius.md,
        }
      }
    },

    // ================================
    // DATE PICKER
    // ================================
    DatePicker: {
      peers: {
        Input: {
          borderRadius: tokens.borderRadius.md,
        }
      }
    },

    // ================================
    // MENUS
    // ================================
    Menu: {
      color: colors.backgroundSoft,
      itemTextColor: colors.textPrimary,
      itemTextColorHover: colors.textPrimary,
      itemTextColorActive: colors.primary,
      itemTextColorActiveHover: colors.primary,
      itemTextColorChildActive: colors.primary,
      itemTextColorChildActiveHover: colors.primary,
      itemColorHover: colors.backgroundMute,
      itemColorActive: `${colors.primary}15`,
      itemColorActiveHover: `${colors.primary}20`,
      borderRadius: tokens.borderRadius.md,
      itemBorderRadius: tokens.borderRadius.sm,
    },

    // ================================
    // MESSAGES/ALERTS
    // ================================
    Message: {
      colorInfo: colors.info,
      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,
      textColorInfo: '#ffffff',
      textColorSuccess: '#ffffff',
      textColorWarning: '#ffffff',
      textColorError: '#ffffff',
      borderRadius: tokens.borderRadius.md,
    },

    Alert: {
      borderRadius: tokens.borderRadius.md,
      titleFontWeight: '600',
    },

    // ================================
    // LAYOUT
    // ================================
    Layout: {
      color: colors.background,
      textColor: colors.textPrimary,
      headerColor: colors.backgroundSoft,
      headerBorderColor: colors.border,
      footerColor: colors.backgroundSoft,
      footerBorderColor: colors.border,
      siderColor: colors.backgroundSoft,
      siderBorderColor: colors.border,
      siderToggleButtonColor: colors.backgroundMute,
      siderToggleButtonBorder: `1px solid ${colors.border}`,
    },

    // ================================
    // TABLES
    // ================================
    DataTable: {
      borderColor: colors.border,
      tdColor: colors.background,
      tdColorHover: colors.backgroundSoft,
      tdColorModal: colors.backgroundSoft,
      thColor: colors.backgroundMute,
      thColorModal: colors.backgroundMute,
      thTextColor: colors.textPrimary,
      tdTextColor: colors.textPrimary,
      borderRadius: tokens.borderRadius.md,
      thFontWeight: '600',
    },

    // ================================
    // PROGRESS
    // ================================
    Progress: {
      fillColor: colors.primary,
      fillColorInfo: colors.info,
      fillColorSuccess: colors.success,
      fillColorWarning: colors.warning,
      fillColorError: colors.error,
      railColor: colors.backgroundMute,
      borderRadius: tokens.borderRadius.full,
    },

    // ================================
    // TAGS
    // ================================
    Tag: {
      borderRadius: tokens.borderRadius.md,
      color: `${colors.primary}15`,
      textColor: colors.primary,
      border: `1px solid ${colors.primary}30`,
      closeColorHover: colors.error,
      closeColorPressed: colors.errorHover,
    }
  }
}

/**
 * Crée un thème Naive UI complet avec mode clair et sombre
 */
export function createNaiveUITheme(customTokens?: DesignTokens) {
  return {
    light: generateNaiveUIThemeOverrides('light', customTokens),
    dark: generateNaiveUIThemeOverrides('dark', customTokens)
  }
}

/**
 * Thème par défaut exporté
 */
export const naiveUITheme = createNaiveUITheme()
