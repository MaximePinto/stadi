/**
 * 🎨 Générateur Tailwind simplifié - UNE SEULE APPROCHE
 *
 * On utilise UNIQUEMENT les variables CSS pour la cohérence
 * avec le système de thèmes dynamiques
 */

import { designTokens } from './tokens'
import type { PluginAPI } from 'tailwindcss/types/config'

/**
 * Génère la configuration Tailwind à partir des design tokens
 */
export function generateTailwindConfig() {
  const tokens = designTokens

  return {
    theme: {
      extend: {
        // ================================
        // COULEURS AVEC VARIABLES CSS
        // ================================
        colors: {
          // Couleurs principales (accessibles via var() ET classes Tailwind)
          primary: 'var(--ds-color-primary)',
          'primary-hover': 'var(--ds-color-primary-hover)',
          'primary-pressed': 'var(--ds-color-primary-pressed)',

          secondary: 'var(--ds-color-secondary)',
          'secondary-hover': 'var(--ds-color-secondary-hover)',

          // Couleurs sémantiques
          info: 'var(--ds-color-info)',
          success: 'var(--ds-color-success)',
          warning: 'var(--ds-color-warning)',
          error: 'var(--ds-color-error)',

          // Couleurs de texte
          'text-primary': 'var(--ds-text-primary)',
          'text-secondary': 'var(--ds-text-secondary)',
          'text-disabled': 'var(--ds-text-disabled)',

          // Arrière-plans
          'bg-base': 'var(--ds-bg-base)',
          'bg-soft': 'var(--ds-bg-soft)',
          'bg-mute': 'var(--ds-bg-mute)',

          // Bordures
          'border-base': 'var(--ds-border-base)',
          'border-hover': 'var(--ds-border-hover)',
          'border-focus': 'var(--ds-border-focus)',
        },

        // ================================
        // TYPOGRAPHIE DEPUIS LES TOKENS
        // ================================
        fontSize: Object.fromEntries(
          Object.entries(tokens.typography).map(([key, value]) => [
            key,
            [value.fontSize, { lineHeight: value.lineHeight }]
          ])
        ),

        // ================================
        // ESPACEMENT DEPUIS LES TOKENS
        // ================================
        spacing: tokens.spacing,

        // ================================
        // BORDER RADIUS DEPUIS LES TOKENS
        // ================================
        borderRadius: tokens.borderRadius,

        // ================================
        // OMBRES AVEC VARIABLES CSS
        // ================================
        boxShadow: {
          'sm': 'var(--ds-shadow-sm)',
          'md': 'var(--ds-shadow-md)',
          'lg': 'var(--ds-shadow-lg)',
          'xl': 'var(--ds-shadow-xl)',
          'glow': 'var(--ds-shadow-glow)',
        },

        // ================================
        // GRADIENTS AVEC VARIABLES CSS
        // ================================
        backgroundImage: {
          'gradient-primary': 'linear-gradient(to right, var(--ds-color-primary), var(--ds-color-primary-hover))',
          'gradient-secondary': 'linear-gradient(to right, var(--ds-color-secondary), var(--ds-color-secondary-hover))',
        },

        // ================================
        // TRANSITIONS AVEC VARIABLES CSS
        // ================================
        transitionDuration: {
          'fast': 'var(--ds-transition-fast)',
          'normal': 'var(--ds-transition-normal)',
          'slow': 'var(--ds-transition-slow)',
        },

        // ================================
        // BREAKPOINTS (statiques, pas besoin de variables)
        // ================================
        screens: {
          'xs': '475px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
        },
      }
    },

    // ================================
    // PLUGIN UNIQUE AVEC COMPOSANTS
    // ================================
    plugins: [
      function({ addUtilities, addComponents, addBase, theme }: PluginAPI) {

        // ================================
        // BASE : Variables CSS injectées
        // ================================
        addBase({
          ':root': {
            // Les variables seront injectées par useDesignSystem
            // On définit juste la structure
          },

          'body': {
            fontFamily: theme('fontFamily.sans'),
            backgroundColor: 'var(--ds-bg-base)',
            color: 'var(--ds-text-primary)',
            transition: 'background-color var(--ds-transition-normal), color var(--ds-transition-normal)',
          },

          '.light': { colorScheme: 'light' },
          '.dark': { colorScheme: 'dark' }
        })

        // ================================
        // COMPOSANTS : Boutons unifiés
        // ================================
        addComponents({
          // Base commune pour tous les boutons
          '.btn': {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--ds-radius-md)',
            fontWeight: '500',
            transition: 'var(--ds-transition-fast)',
            cursor: 'pointer',
            border: '1px solid transparent',
            fontSize: theme('fontSize.base')[0],
            lineHeight: theme('fontSize.base')[1].lineHeight,

            '&:disabled': {
              opacity: '0.5',
              cursor: 'not-allowed',
            }
          },

          // Tailles
          '.btn-sm': {
            padding: 'var(--ds-spacing-sm) var(--ds-spacing-md)',
            fontSize: theme('fontSize.sm')[0],
          },
          '.btn-md': {
            padding: 'var(--ds-spacing-sm) var(--ds-spacing-lg)',
          },
          '.btn-lg': {
            padding: 'var(--ds-spacing-md) var(--ds-spacing-xl)',
            fontSize: theme('fontSize.lg')[0],
          },

          // Variantes de couleur (UNE SEULE VERSION)
          '.btn-primary': {
            backgroundColor: 'var(--ds-color-primary)',
            borderColor: 'var(--ds-color-primary)',
            color: 'white',

            '&:hover:not(:disabled)': {
              backgroundColor: 'var(--ds-color-primary-hover)',
              borderColor: 'var(--ds-color-primary-hover)',
            },

            '&:active:not(:disabled)': {
              backgroundColor: 'var(--ds-color-primary-pressed)',
              borderColor: 'var(--ds-color-primary-pressed)',
            }
          },

          '.btn-secondary': {
            backgroundColor: 'transparent',
            borderColor: 'var(--ds-color-primary)',
            color: 'var(--ds-color-primary)',

            '&:hover:not(:disabled)': {
              backgroundColor: 'var(--ds-color-primary)',
              color: 'white',
            }
          },

          '.btn-success': {
            backgroundColor: 'var(--ds-color-success)',
            borderColor: 'var(--ds-color-success)',
            color: 'white',

            '&:hover:not(:disabled)': {
              backgroundColor: 'var(--ds-color-success-hover)',
              borderColor: 'var(--ds-color-success-hover)',
            }
          },

          '.btn-error': {
            backgroundColor: 'var(--ds-color-error)',
            borderColor: 'var(--ds-color-error)',
            color: 'white',

            '&:hover:not(:disabled)': {
              backgroundColor: 'var(--ds-color-error-hover)',
              borderColor: 'var(--ds-color-error-hover)',
            }
          }
        })

        // ================================
        // UTILITAIRES : Classes helpers
        // ================================
        addUtilities({
          // Cartes
          '.card': {
            backgroundColor: 'var(--ds-bg-soft)',
            border: '1px solid var(--ds-border-base)',
            borderRadius: 'var(--ds-radius-lg)',
            padding: 'var(--ds-spacing-lg)',
            boxShadow: 'var(--ds-shadow-sm)',
            transition: 'var(--ds-transition-normal)',

            '&:hover': {
              boxShadow: 'var(--ds-shadow-md)',
              borderColor: 'var(--ds-border-hover)',
            }
          },

          // Boutons modernes avec preset
          '.btn-modern': {
            background: 'var(--gaming-gradient, var(--ds-color-primary))',
            border: '1px solid var(--gaming-glow, var(--ds-color-primary))',
            color: 'white',
            borderRadius: 'var(--ds-radius-md)',
            padding: 'var(--ds-spacing-sm) var(--ds-spacing-lg)',
            transition: 'all var(--ds-transition-fast)',
            position: 'relative',
            overflow: 'hidden',

            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 'var(--gaming-border-glow, 0 0 15px var(--ds-color-primary)40)',
            },

            '&:active': {
              transform: 'translateY(0)',
            }
          },

          '.btn-preset-aware': {
            transition: 'all var(--ds-transition-normal)',

            '&[data-preset="cyberpunk"]': {
              filter: 'saturate(1.2) contrast(1.1)',
            },

            '&[data-preset="ocean"]': {
              filter: 'hue-rotate(10deg) saturate(1.1)',
            },

            '&[data-preset="forest"]': {
              filter: 'sepia(0.1) saturate(1.2)',
            }
          },

          // Focus standardisé
          '.focus': {
            '&:focus': {
              outline: 'none',
              boxShadow: '0 0 0 2px var(--ds-border-focus)',
            }
          },

          // Effets de glow
          '.glow': {
            boxShadow: 'var(--ds-shadow-glow)',
          },

          // Container responsive
          '.container': {
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 'var(--ds-spacing-md)',
            paddingRight: 'var(--ds-spacing-md)',

            '@media (min-width: 768px)': {
              paddingLeft: 'var(--ds-spacing-lg)',
              paddingRight: 'var(--ds-spacing-lg)',
            }
          }
        })
      }
    ]
  }
}
