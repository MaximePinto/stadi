// Types utilitaires

// Type pour les rôles utilisateur
export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

// Type pour les rôles de héros
export type HeroRole = 'Tank' | 'Damage' | 'Support';

// Type pour les effets d'amélioration
export interface UpgradeEffect {
  type: 'damage' | 'healing' | 'cooldown' | 'duration' | 'range' | 'custom';
  value: number | string;
  unit?: string;
  description?: string;
}

// Type pour les slots d'amélioration
export type UpgradeSlot = 1 | 2 | 3 | 4 | 5;

// Type pour les statuts de chargement
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

// Type pour les messages d'erreur
export interface ErrorMessage {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Type pour les options de tri
export interface SortOption {
  field: string;
  label: string;
  defaultOrder?: 'asc' | 'desc';
}

// Type pour les filtres génériques
export interface FilterOption {
  value: string | number | boolean;
  label: string;
}

// Type pour les paramètres de recherche
export interface SearchParams {
  query: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
