/**
 * 🎨 Preset Tailwind simplifié - SANS DOUBLONS
 *
 * Ce preset utilise UNIQUEMENT le générateur et ajoute seulement
 * les éléments spécifiques au projet (animations, grilles, etc.)
 */

const { generateTailwindConfig } = require('./tailwind.generator.js')

// Génération automatique de la configuration de base
const generatedConfig = generateTailwindConfig()

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // ================================
  // BASE : Configuration générée
  // ================================
  ...generatedConfig,

  theme: {
    extend: {
      // ================================
      // REPRISE : Toute la config générée
      // ================================
      ...generatedConfig.theme.extend,

      // ================================
      // AJOUTS : Spécifiques au projet uniquement
      // ================================

      // Polices (spécifique au projet)
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },

      // Grilles personnalisées (spécifique au projet)
      gridTemplateColumns: {
        'auto-fit-xs': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-sm': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(350px, 1fr))',
      },

      // Animations gaming (spécifique au projet)
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'gaming-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },

      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.3s ease-in-out',
        'slide-in-right': 'slide-in-right 0.3s ease-in-out',
        'slide-out-right': 'slide-out-right 0.3s ease-in-out',
        'scale-in': 'scale-in 0.2s ease-in-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gaming-float': 'gaming-float 3s ease-in-out infinite',
      }
    }
  },

  // ================================
  // PLUGINS : Base + spécifiques
  // ================================
  plugins: [
    // Plugin de base avec les composants (depuis le générateur)
    ...generatedConfig.plugins,

    // Plugin spécifique au projet gaming
    function({ addUtilities }) {
      addUtilities({
        // Effets gaming spéciaux
        '.gaming-glow': {
          boxShadow: '0 0 20px var(--ds-color-primary), 0 0 40px var(--ds-color-primary)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        },

        '.gaming-border': {
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(var(--ds-bg-base), var(--ds-bg-base)), linear-gradient(45deg, var(--ds-color-primary), var(--ds-color-secondary))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
        },

        // Utilitaires de layout gaming
        '.gaming-panel': {
          backgroundColor: 'var(--ds-bg-soft)',
          border: '1px solid var(--ds-border-base)',
          borderRadius: 'var(--ds-radius-lg)',
          padding: 'var(--ds-spacing-lg)',
          position: 'relative',
          overflow: 'hidden',

          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '-100%',
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--ds-color-primary), transparent)',
            animation: 'slide-in-right 2s ease-in-out infinite',
          }
        },

        // Scrollbar gaming style
        '.gaming-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--ds-bg-mute)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--ds-color-primary)',
            borderRadius: '4px',

            '&:hover': {
              background: 'var(--ds-color-primary-hover)',
            }
          },
        }
      })
    }
  ]
}
