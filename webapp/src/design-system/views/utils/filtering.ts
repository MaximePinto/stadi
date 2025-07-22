import type { ComponentSection, ComponentCategory, ComplexityLevel } from '@/design-system/types/demo'

/**
 * Utilitaires pour filtrer et organiser les sections de composants
 */

/**
 * Filtre les sections par catégorie
 */
export const filterByCategory = (
  sections: ComponentSection[], 
  category: ComponentCategory
): ComponentSection[] => {
  return sections.filter(section => section.category === category)
}

/**
 * Filtre les sections par niveau de complexité
 */
export const filterByComplexity = (
  sections: ComponentSection[], 
  complexity: ComplexityLevel
): ComponentSection[] => {
  return sections.filter(section => 
    section.variants.some(variant => variant.complexity === complexity)
  )
}

/**
 * Filtre les sections par tags
 */
export const filterByTags = (
  sections: ComponentSection[], 
  searchTags: string[]
): ComponentSection[] => {
  return sections.filter(section => {
    const sectionTags = section.tags || []
    const variantTags = section.variants.flatMap(variant => variant.tags || [])
    const allTags = [...sectionTags, ...variantTags]
    
    return searchTags.some(tag => 
      allTags.some(sectionTag => 
        sectionTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  })
}

/**
 * Groupe les sections par catégorie
 */
export const groupByCategory = (sections: ComponentSection[]): Record<ComponentCategory, ComponentSection[]> => {
  const groups: Record<ComponentCategory, ComponentSection[]> = {
    theming: [],
    forms: [],
    navigation: [],
    layout: [],
    feedback: []
  }

  sections.forEach(section => {
    groups[section.category].push(section)
  })

  return groups
}

/**
 * Récupère toutes les catégories disponibles
 */
export const getAvailableCategories = (sections: ComponentSection[]): ComponentCategory[] => {
  const categories = new Set(sections.map(section => section.category))
  return Array.from(categories)
}

/**
 * Récupère tous les niveaux de complexité disponibles
 */
export const getAvailableComplexities = (sections: ComponentSection[]): ComplexityLevel[] => {
  const complexities = new Set(
    sections.flatMap(section => 
      section.variants.map(variant => variant.complexity).filter(Boolean) as ComplexityLevel[]
    )
  )
  return Array.from(complexities)
}

/**
 * Récupère tous les tags disponibles
 */
export const getAvailableTags = (sections: ComponentSection[]): string[] => {
  const tags = new Set([
    ...sections.flatMap(section => section.tags || []),
    ...sections.flatMap(section => section.variants.flatMap(variant => variant.tags || []))
  ])
  return Array.from(tags).sort()
}