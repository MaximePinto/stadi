// Interfaces pour les entités de l'application

export interface User {
  id: number;
  email: string;
  roles: string[];
}

export interface Hero {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string | null;
  abilities: Ability[];
}

export interface Ability {
  id: number;
  hero: Hero;
  name: string;
  description: string;
  cooldown: number | null;
  iconUrl: string | null;
  upgrades: Upgrade[];
}

export interface Upgrade {
  id: number;
  ability: Ability;
  name: string;
  description: string;
  cost: number;
  effect: Record<string, unknown>;
  buildUpgrades: BuildUpgrade[];
}

export interface Build {
  id: number;
  user: User;
  hero: Hero;
  name: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isPublic: boolean;
  buildUpgrades: BuildUpgrade[];
}

export interface BuildUpgrade {
  id: number;
  build: Build;
  upgrade: Upgrade;
  slot: number;
}

// Types utilitaires pour les réponses API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
