// Color schemes per tradition — used for idea cards and detail pages.

export const REGION_THEMES = {
  western: {
    name: 'Western',
    primary: '#2c3e50',
    primaryLight: '#4a6fa5',
    secondary: '#5d6d7e',
    accent: '#3498db',
    accentMuted: '#aed6f1',
    bgTint: 'rgba(52, 152, 219, 0.06)',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #5d6d7e 100%)',
    gradientSoft: 'linear-gradient(180deg, rgba(52, 152, 219, 0.08) 0%, transparent 100%)',
    border: '#d5d8dc',
    icon: '◆', // classical / structural
  },
  eastern: {
    name: 'Eastern',
    primary: '#5d4037',
    primaryLight: '#8d6e63',
    secondary: '#795548',
    accent: '#7cb342',
    accentMuted: '#c5e1a5',
    bgTint: 'rgba(124, 179, 66, 0.06)',
    gradient: 'linear-gradient(135deg, #4e342e 0%, #7cb342 40%, #8d6e63 100%)',
    gradientSoft: 'linear-gradient(180deg, rgba(124, 179, 66, 0.08) 0%, transparent 100%)',
    border: '#bcaaa4',
    icon: '☸',
  },
  african: {
    name: 'African',
    primary: '#1b5e20',
    primaryLight: '#388e3c',
    secondary: '#2e7d32',
    accent: '#ff9800',
    accentMuted: '#ffe0b2',
    bgTint: 'rgba(255, 152, 0, 0.06)',
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #ff9800 50%, #388e3c 100%)',
    gradientSoft: 'linear-gradient(180deg, rgba(255, 152, 0, 0.08) 0%, transparent 100%)',
    border: '#a5d6a7',
    icon: '◉',
  },
  latin: {
    name: 'Latin American',
    primary: '#b71c1c',
    primaryLight: '#e53935',
    secondary: '#c62828',
    accent: '#ffeb3b',
    accentMuted: '#fff9c4',
    bgTint: 'rgba(255, 235, 59, 0.06)',
    gradient: 'linear-gradient(135deg, #b71c1c 0%, #ffeb3b 40%, #e53935 100%)',
    gradientSoft: 'linear-gradient(180deg, rgba(255, 235, 59, 0.08) 0%, transparent 100%)',
    border: '#ef9a9a',
    icon: '✊',
  },
  indigenous: {
    name: 'Indigenous',
    primary: '#004d40',
    primaryLight: '#00695c',
    secondary: '#00897b',
    accent: '#d84315',
    accentMuted: '#ffccbc',
    bgTint: 'rgba(0, 121, 107, 0.06)',
    gradient: 'linear-gradient(135deg, #004d40 0%, #d84315 40%, #00695c 100%)',
    gradientSoft: 'linear-gradient(180deg, rgba(0, 121, 107, 0.08) 0%, transparent 100%)',
    border: '#80cbc4',
    icon: '◎',
  },
};

export function getThemeForRegion(regionId) {
  return REGION_THEMES[regionId] || REGION_THEMES.western;
}
