export const colors = {
  // Colores principales
  primary: '#6C63FF',
  primaryDark: '#5B52E6',
  primaryLight: '#8A82FF',
  
  // Colores secundarios
  secondary: '#FF6584',
  secondaryDark: '#E54A6A',
  secondaryLight: '#FF8AA6',
  
  // Colores neutrales
  white: '#FFFFFF',
  black: '#1A1A1A',
  gray50: '#F9F9F9',
  gray100: '#F0F0F0',
  gray200: '#E0E0E0',
  gray300: '#C0C0C0',
  gray400: '#9A9A9A',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#3A3A3A',
  gray800: '#262626',
  gray900: '#1A1A1A',
  
  // Colores de estado
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
  
  // Fondos
  background: {
    light: '#FFFFFF',
    dark: '#1A1A1A',
  },
  
  // Cards
  card: {
    light: '#FFFFFF',
    dark: '#2C2C2C',
  }
};

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
};