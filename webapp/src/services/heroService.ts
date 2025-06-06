import { api } from './api'
import type { Hero, HeroResponse } from '@/types/entities'
import type { CreateHeroRequest, HeroFilters } from '@/types/api'

export const heroService = {
  async list(filters?: HeroFilters): Promise<PaginatedResponse<HeroResponse>> {
    return api.get<PaginatedResponse<HeroResponse>>('/api/heroes', { params: filters })
  },

  async get(id: number): Promise<Hero> {
    return api.get<Hero>(`/api/heroes/${id}`)
  },

  async create(hero: CreateHeroRequest): Promise<{ id: number }> {
    return api.post<{ id: number }>('/api/heroes', hero)
  },

  async update(id: number, hero: Partial<CreateHeroRequest>): Promise<void> {
    return api.put(`/api/heroes/${id}`, hero)
  },

  async delete(id: number): Promise<void> {
    return api.delete(`/api/heroes/${id}`)
  }
}
