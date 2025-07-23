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
      primaryColor: colors.primaryBase,
      primaryColorHover: colors.primaryHover,
      primaryColorPressed: colors.primaryPressed,
      primaryColorSuppl: colors.primaryBase,

      // Couleurs d'information
      infoColor: colors.infoBase,
      infoColorHover: colors.infoHover,
      infoColorPressed: colors.infoPressed,
      infoColorSuppl: colors.infoBase,

      // Couleurs de succès
      successColor: colors.successBase,
      successColorHover: colors.successHover,
      successColorPressed: colors.successPressed,
      successColorSuppl: colors.successBase,

      // Couleurs d'avertissement
      warningColor: colors.warningBase,
      warningColorHover: colors.warningHover,
      warningColorPressed: colors.warningPressed,
      warningColorSuppl: colors.warningBase,

      // Couleurs d'erreur
      errorColor: colors.errorBase,
      errorColorHover: colors.errorHover,
      errorColorPressed: colors.errorPressed,
      errorColorSuppl: colors.errorBase,

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
      fontSize: tokens.typography.body.fontSize,
      fontSizeMini: tokens.typography.caption.fontSize,
      fontSizeTiny: tokens.typography.caption.fontSize,
      fontSizeSmall: tokens.typography.caption.fontSize,
      fontSizeMedium: tokens.typography.body.fontSize,
      fontSizeLarge: tokens.typography.h5.fontSize,
      fontSizeHuge: tokens.typography.h4.fontSize,

      // Hauteur de ligne
      lineHeight: tokens.typography.body.lineHeight,
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

      fontSize: tokens.typography.body.fontSize,
      fontSizeTiny: tokens.typography.caption.fontSize,
      fontSizeSmall: tokens.typography.caption.fontSize,
      fontSizeMedium: tokens.typography.body.fontSize,
      fontSizeLarge: tokens.typography.h5.fontSize,
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
      titleFontSize: tokens.typography.h5.fontSize,

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
          optionCheckColor: colors.primaryBase,
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
      itemTextColorActive: colors.primaryBase,
      itemTextColorActiveHover: colors.primaryBase,
      itemTextColorChildActive: colors.primaryBase,
      itemTextColorChildActiveHover: colors.primaryBase,
      itemColorHover: colors.backgroundMute,
      itemColorActive: `${colors.primaryBase}15`,
      itemColorActiveHover: `${colors.primaryBase}20`,
      borderRadius: tokens.borderRadius.md,
      itemBorderRadius: tokens.borderRadius.sm,
    },

    // ================================
    // MESSAGES/ALERTS
    // ================================
    Message: {
      colorInfo: colors.infoBase,
      colorSuccess: colors.successBase,
      colorWarning: colors.warningBase,
      colorError: colors.errorBase,
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
      fillColor: colors.primaryBase,
      fillColorInfo: colors.infoBase,
      fillColorSuccess: colors.successBase,
      fillColorWarning: colors.warningBase,
      fillColorError: colors.errorBase,
      railColor: colors.backgroundMute,
      borderRadius: tokens.borderRadius.full,
    },

    // ================================
    // TAGS
    // ================================
    Tag: {
      borderRadius: tokens.borderRadius.md,
      color: `${colors.primaryBase}15`,
      textColor: colors.primaryBase,
      border: `1px solid ${colors.primaryBase}30`,
      closeColorHover: colors.errorBase,
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
