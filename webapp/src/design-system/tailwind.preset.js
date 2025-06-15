/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      /**
       * Colors: Defines the application's color palette.
       * - primary: Main brand color, used for calls to action. (Inspired by blue/indigo/purple)
       * - secondary: Used for less prominent elements. (Inspired by gray/slate)
       * - neutral: Shades of gray for backgrounds, borders, and text.
       * - textBase: Default text color.
       * - textMuted: Muted text color for secondary information.
       */
      colors: {
        primary: {
          DEFAULT: '#4338ca', // indigo-700 (plus foncé pour le DEFAULT, car hover est souvent plus clair ou change d'aspect)
          hover: '#4f46e5',   // indigo-600
          // Pour les dégradés, nous utiliserons les classes bg-gradient-to-X directement dans les composants,
          // mais nous définissons ici les couleurs principales du dégradé si nécessaire pour d'autres usages (bordures, textes, etc.)
          // Exemple si on voulait des couleurs spécifiques pour le dégradé:
          // gradientStart: '#3b82f6', // blue-500
          // gradientVia: '#6366f1',   // indigo-500
          // gradientEnd: '#8b5cf6',    // purple-500
        },
        secondary: {
          DEFAULT: '#334155', // slate-700
          hover: '#475569',   // slate-600
          // gradientStart: '#475569', // slate-600
          // gradientVia: '#334155',   // slate-700
          // gradientEnd: '#1e293b',    // slate-800
        },
        // Palette "gaming" sombre
        neutral: {
          DEFAULT: '#1e293b', // slate-800 (pour fonds de carte, etc.)
          light: '#334155',  // slate-700 (pour bordures ou fonds plus clairs)
          lighter: '#475569', // slate-600
          dark: '#0f172a',    // slate-900
        },
        // Couleurs pour textes, icônes, etc.
        textBase: '#e2e8f0', // slate-200
        textMuted: '#94a3b8', // slate-400
      },
      /**
       * Spacing: Defines padding and margin utility values.
       * - btn-p(x/y)-(sm/md/lg): Specific paddings for buttons.
       * - p-(sm/md/lg/xl): Generic paddings for containers like cards, sections.
       */
      spacing: {
        // Basé sur GameButton: sm: 'px-4 py-2', md: 'px-6 py-3', lg: 'px-8 py-4'
        // On peut créer des tokens génériques ou spécifiques
        'btn-py-sm': '0.5rem', // py-2
        'btn-px-sm': '1rem',   // px-4
        'btn-py-md': '0.75rem',// py-3
        'btn-px-md': '1.5rem', // px-6
        'btn-py-lg': '1rem',   // py-4
        'btn-px-lg': '2rem',   // px-8
        // Tokens génériques pour padding de sections, cartes etc.
        'p-sm': '0.5rem',
        'p-md': '1rem',
        'p-lg': '1.5rem',
        'p-xl': '2rem',
      },
      /**
       * BorderRadius: Defines border radius utility values.
       * - DEFAULT: Default border radius (0.5rem, e.g., for cards, inputs).
       * - sm, md, lg: Standardized radius sizes.
       */
      borderRadius: {
        'DEFAULT': '0.5rem', // rounded-lg dans GameButton
        'sm': '0.25rem',
        'md': '0.5rem',      // correspond à rounded-lg
        'lg': '0.75rem',
        'full': '9999px',
      },
      /**
       * FontSize: Defines text size utility values.
       * - sm, base, lg: Standard text sizes based on GameButton.
       * - xl, 2xl, ... : Larger text sizes for titles.
       */
      fontSize: {
        // Basé sur GameButton: sm: 'text-sm', md: 'text-base', lg: 'text-lg'
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // text-sm
        'base': ['1rem', { lineHeight: '1.5rem' }],     // text-base
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // text-lg
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      /**
       * BoxShadow: Defines shadow effects.
       * - glow-primary/secondary: Gaming-inspired glow effects.
       */
      boxShadow: {
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.6)', // #4f46e5 avec opacité
        'glow-secondary': '0 0 20px rgba(71, 85, 105, 0.5)', // #475569 avec opacité
      }
    }
  }
};
