/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      /**
       * Couleurs : Définit la palette de couleurs de l'application.
       * - primary: Couleur principale de la marque, utilisée pour les appels à l'action. (Inspiré du bleu/indigo/violet)
       * - secondary: Utilisé pour les éléments moins proéminents. (Inspiré du gris/ardoise)
       * - neutral: Nuances de gris pour les arrière-plans, bordures et texte.
       * - textBase: Couleur de texte par défaut.
       * - textMuted: Couleur de texte atténuée pour les informations secondaires.
       */
      colors: {
        // Couleurs principales - structure plate pour compatibilité avec le composant
        primary: '#4338ca',           // indigo-700
        'primary-hover': '#4f46e5',   // indigo-600
        secondary: '#334155',         // slate-700
        'secondary-hover': '#475569', // slate-600

        // Couleurs pour gradients personnalisés
        'primary-gradient-start': '#3b82f6',  // blue-500
        'primary-gradient-via': '#6366f1',    // indigo-500
        'primary-gradient-end': '#8b5cf6',    // purple-500

        'secondary-gradient-start': '#475569', // slate-600
        'secondary-gradient-via': '#334155',   // slate-700
        'secondary-gradient-end': '#1e293b',   // slate-800

        // Palette "gaming" sombre
        neutral: {
          DEFAULT: '#1e293b',
          light: '#334155',
          lighter: '#475569',
          dark: '#0f172a',
        },

        // Couleurs pour textes, icônes, etc.
        textBase: '#e2e8f0',
        textMuted: '#94a3b8',
      },

      /**
       * Gradients personnalisés
       */
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)',
        'gradient-primary-hover': 'linear-gradient(to right, #2563eb, #4f46e5, #7c3aed)',
        'gradient-secondary': 'linear-gradient(to right, #475569, #334155, #1e293b)',
        'gradient-secondary-hover': 'linear-gradient(to right, #64748b, #475569, #334155)',
      },

      /**
       * Espacement : Définit les valeurs d'utilité pour le padding et la marge.
       * - btn-p(x/y)-(sm/md/lg): Paddings spécifiques pour les boutons.
       * - p-(sm/md/lg/xl): Paddings génériques pour les conteneurs comme les cartes, sections.
       */
      spacing: {
        // Basé sur DsButton: sm: 'px-4 py-2', md: 'px-6 py-3', lg: 'px-8 py-4'
        // Tokens spécifiques pour les boutons
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
       * Rayon de bordure : Définit les valeurs d'utilité pour le border radius.
       * - DEFAULT: Rayon de bordure par défaut (0.5rem, ex: pour cartes, inputs).
       * - sm, md, lg: Tailles de rayon standardisées.
       */
      borderRadius: {
        'DEFAULT': '0.5rem', // rounded-lg dans DsButton
        'sm': '0.25rem',
        'md': '0.5rem',      // correspond à rounded-lg
        'lg': '0.75rem',
        'full': '9999px',
      },

      /**
       * Taille de police : Définit les valeurs d'utilité pour la taille de texte.
       * - sm, base, lg: Tailles de texte standard basées sur DsButton.
       * - xl, 2xl, ... : Tailles de texte plus grandes pour les titres.
       */
      fontSize: {
        // Basé sur DsButton: sm: 'text-sm', md: 'text-base', lg: 'text-lg'
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // text-sm
        'base': ['1rem', { lineHeight: '1.5rem' }],     // text-base
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // text-lg
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },

      /**
       * Ombre de boîte : Définit les effets d'ombre.
       * - glow-primary/secondary: Effets de lueur inspirés du gaming.
       */
      boxShadow: {
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.6)', // #4f46e5 avec opacité
        'glow-secondary': '0 0 20px rgba(71, 85, 105, 0.5)', // #475569 avec opacité
      }
    }
  }
};