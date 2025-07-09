<template>
  <div class="min-h-screen bg-bg-base text-text-primary transition-all duration-300">
    <!-- Header -->
    <header class="bg-bg-soft border-b border-border-base p-6">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-text-primary mb-4">
          🎨 Demo Tailwind CSS
        </h1>
        <p class="text-text-secondary text-lg">
          Utilisation des classes Tailwind avec variables CSS du design system
        </p>
      </div>
    </header>

    <!-- Contrôles de thème -->
    <div class="bg-bg-mute border-b border-border-base p-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-2">Thème :</label>
            <div class="flex gap-2">
              <button
                v-for="preset in availablePresets"
                :key="preset"
                @click="setThemePreset(preset)"
                :class="[
                  'px-4 py-2 rounded-md font-medium transition-all duration-200',
                  themePreset === preset
                    ? 'bg-primary text-white shadow-glow'
                    : 'bg-bg-soft text-text-primary border border-border-base hover:border-border-hover hover:bg-bg-mute'
                ]"
              >
                {{ themePresets[preset].name }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-secondary mb-2">Mode :</label>
            <button
              @click="toggleTheme"
              class="px-4 py-2 rounded-md font-medium bg-bg-soft text-text-primary border border-border-base hover:border-border-hover hover:bg-bg-mute transition-all duration-200"
            >
              {{ effectiveMode === 'dark' ? '🌙 Sombre' : '☀️ Clair' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <main class="container mx-auto p-6">
      <!-- Section Couleurs -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-text-primary">🎨 Palette de Couleurs</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Couleurs principales -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-text-primary">Principales</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-primary shadow-glow"></div>
                <div>
                  <div class="font-medium text-text-primary">Primary</div>
                  <div class="text-sm text-text-secondary">Couleur principale</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-primary-hover"></div>
                <div>
                  <div class="font-medium text-text-primary">Primary Hover</div>
                  <div class="text-sm text-text-secondary">Au survol</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-primary-pressed"></div>
                <div>
                  <div class="font-medium text-text-primary">Primary Pressed</div>
                  <div class="text-sm text-text-secondary">Au clic</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Couleurs secondaires -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-text-primary">Secondaires</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-secondary"></div>
                <div>
                  <div class="font-medium text-text-primary">Secondary</div>
                  <div class="text-sm text-text-secondary">Couleur secondaire</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-secondary-hover"></div>
                <div>
                  <div class="font-medium text-text-primary">Secondary Hover</div>
                  <div class="text-sm text-text-secondary">Au survol</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Couleurs sémantiques -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-text-primary">Sémantiques</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-success"></div>
                <div>
                  <div class="font-medium text-text-primary">Success</div>
                  <div class="text-sm text-text-secondary">Succès</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-warning"></div>
                <div>
                  <div class="font-medium text-text-primary">Warning</div>
                  <div class="text-sm text-text-secondary">Avertissement</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-error"></div>
                <div>
                  <div class="font-medium text-text-primary">Error</div>
                  <div class="text-sm text-text-secondary">Erreur</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrière-plans -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-text-primary">Arrière-plans</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-bg-base border border-border-base"></div>
                <div>
                  <div class="font-medium text-text-primary">Base</div>
                  <div class="text-sm text-text-secondary">Arrière-plan principal</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-bg-soft border border-border-base"></div>
                <div>
                  <div class="font-medium text-text-primary">Soft</div>
                  <div class="text-sm text-text-secondary">Arrière-plan doux</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-bg-mute border border-border-base"></div>
                <div>
                  <div class="font-medium text-text-primary">Mute</div>
                  <div class="text-sm text-text-secondary">Arrière-plan muet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Composants -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-text-primary">🧩 Composants</h2>

        <!-- Boutons -->
        <div class="mb-8">
          <h3 class="text-2xl font-semibold mb-4 text-text-primary">Boutons</h3>
          <div class="flex flex-wrap gap-4">
            <button class="btn btn-primary btn-md">
              Bouton Primary
            </button>
            <button class="btn btn-secondary btn-md">
              Bouton Secondary
            </button>
            <button class="btn btn-success btn-md">
              Bouton Success
            </button>
            <button class="btn btn-error btn-md">
              Bouton Error
            </button>
          </div>
        </div>

        <!-- Cartes -->
        <div class="mb-8">
          <h3 class="text-2xl font-semibold mb-4 text-text-primary">Cartes</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="card">
              <h4 class="text-xl font-semibold mb-2 text-text-primary">Carte Standard</h4>
              <p class="text-text-secondary mb-4">
                Cette carte utilise les classes Tailwind avec les variables CSS du design system.
              </p>
              <button class="btn btn-primary btn-sm">
                Action
              </button>
            </div>

            <div class="card gaming-panel">
              <h4 class="text-xl font-semibold mb-2 text-text-primary">Carte Gaming</h4>
              <p class="text-text-secondary mb-4">
                Avec effets gaming spéciaux et animations.
              </p>
              <button class="btn btn-secondary btn-sm">
                Gaming Action
              </button>
            </div>

            <div class="card gaming-glow">
              <h4 class="text-xl font-semibold mb-2 text-text-primary">Carte Glow</h4>
              <p class="text-text-secondary mb-4">
                Avec effet de lueur (glow) animé.
              </p>
              <button class="btn btn-primary btn-sm">
                Glow Action
              </button>
            </div>
          </div>
        </div>

        <!-- Formulaires -->
        <div class="mb-8">
          <h3 class="text-2xl font-semibold mb-4 text-text-primary">Formulaires</h3>
          <div class="max-w-md space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 rounded-md bg-bg-soft border border-border-base text-text-primary placeholder-text-disabled focus:border-border-focus focus:outline-none transition-all duration-200"
                placeholder="Entrez votre nom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                class="w-full px-4 py-2 rounded-md bg-bg-soft border border-border-base text-text-primary placeholder-text-disabled focus:border-border-focus focus:outline-none transition-all duration-200"
                placeholder="email@exemple.com"
              />
            </div>
            <button class="btn btn-primary btn-md w-full">
              Envoyer
            </button>
          </div>
        </div>

        <!-- Alertes -->
        <div class="mb-8">
          <h3 class="text-2xl font-semibold mb-4 text-text-primary">Alertes</h3>
          <div class="space-y-4">
            <div class="p-4 rounded-lg bg-success/10 border border-success/20 text-success">
              <div class="font-medium">Succès !</div>
              <div class="text-sm opacity-80">L'opération s'est bien déroulée.</div>
            </div>
            <div class="p-4 rounded-lg bg-warning/10 border border-warning/20 text-warning">
              <div class="font-medium">Attention !</div>
              <div class="text-sm opacity-80">Veuillez vérifier vos informations.</div>
            </div>
            <div class="p-4 rounded-lg bg-error/10 border border-error/20 text-error">
              <div class="font-medium">Erreur !</div>
              <div class="text-sm opacity-80">Une erreur s'est produite.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Utilitaires -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-text-primary">🔧 Utilitaires</h2>

        <!-- Espacements -->
        <div class="mb-8">
          <h3 class="text-2xl font-semibold mb-4 text-text-primary">Espacements</h3>
          <div class="space-y-4">
            <div class="bg-bg-soft p-xs rounded border border-border-base">
              <code class="text-sm text-text-secondary">p-xs (0.25rem)</code>
            </div>
            <div class="bg-bg-soft p-sm rounded border border-border-base">
              <code class="text-sm text-text-secondary">p-sm (0.5rem)</code>
            </div>
            <div class="bg-bg-soft p-md rounded border border-border-base">
              <code class="text-sm text-text-secondary">p-md (1rem)</code>
            </div>
            <div class="bg-bg-soft p-lg rounded border border-border-base">
              <code class="text-sm text-text-secondary">p-lg (1.5rem)</code>
            </div>
            <div class="bg-bg-soft p-xl rounded border border-border-base">
              <code class="text-sm text-text-secondary">p-xl (2rem)</code>
            </div>
          </div>
        </div>

        <!-- Ombres -->
        <div class="mb-8">
          <h3 class="text-2xl font-semibold mb-4 text-text-primary">Ombres</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-lg bg-bg-soft shadow-sm">
              <div class="font-medium text-text-primary mb-2">Shadow SM</div>
              <div class="text-sm text-text-secondary">Ombre légère</div>
            </div>
            <div class="p-6 rounded-lg bg-bg-soft shadow-md">
              <div class="font-medium text-text-primary mb-2">Shadow MD</div>
              <div class="text-sm text-text-secondary">Ombre moyenne</div>
            </div>
            <div class="p-6 rounded-lg bg-bg-soft shadow-lg">
              <div class="font-medium text-text-primary mb-2">Shadow LG</div>
              <div class="text-sm text-text-secondary">Ombre large</div>
            </div>
            <div class="p-6 rounded-lg bg-bg-soft shadow-glow">
              <div class="font-medium text-text-primary mb-2">Shadow Glow</div>
              <div class="text-sm text-text-secondary">Effet de lueur</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useDesignSystem } from '@/composables/useDesignSystem'
import { themePresets } from '@/design-system/tokens'

const {
  themePreset,
  effectiveMode,
  availablePresets,
  setThemePreset,
  toggleTheme
} = useDesignSystem()
</script>
