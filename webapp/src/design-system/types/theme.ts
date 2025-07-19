/**
 * Types relatifs au système de thème du Design System
 */

export type ThemeChangeEvent =
  | { mode: 'light' | 'dark' | 'auto'; type: 'mode' }
  | { preset: string; type: 'preset' }
  | { type: 'toggle' }