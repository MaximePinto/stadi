import type { User, Hero, Ability, Upgrade, Build, BuildUpgrade } from './entities';

// Types pour les requêtes de création
export interface CreateHeroRequest {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
}

export interface CreateAbilityRequest {
  heroId: number;
  name: string;
  description: string;
  cooldown?: number;
  iconUrl?: string;
}

export interface CreateUpgradeRequest {
  abilityId: number;
  name: string;
  description: string;
  cost: number;
  effect: Record<string, unknown>;
}

export interface CreateBuildRequest {
  heroId: number;
  name: string;
  description: string;
  isPublic: boolean;
  buildUpgrades: {
    upgradeId: number;
    slot: number;
  }[];
}

// Types pour les requêtes de mise à jour
export interface UpdateHeroRequest extends Partial<CreateHeroRequest> {}
export interface UpdateAbilityRequest extends Partial<CreateAbilityRequest> {}
export interface UpdateUpgradeRequest extends Partial<CreateUpgradeRequest> {}
export interface UpdateBuildRequest extends Partial<CreateBuildRequest> {}

// Types pour les réponses API
export type HeroResponse = Hero;
export type AbilityResponse = Ability;
export type UpgradeResponse = Upgrade;
export type BuildResponse = Build;
export type BuildUpgradeResponse = BuildUpgrade;
export type UserResponse = User;

// Types pour les paramètres de pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Types pour les filtres
export interface HeroFilters extends PaginationParams {
  role?: string;
  search?: string;
}

export interface BuildFilters extends PaginationParams {
  heroId?: number;
  userId?: number;
  isPublic?: boolean;
  search?: string;
}

export interface UpgradeFilters extends PaginationParams {
  abilityId?: number;
  search?: string;
}
