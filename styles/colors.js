export const colors = {
  ocean: '#0E7490',
  oceanDark: '#155E75',
  oceanSoft: '#D9F3F7',
  coral: '#F9735B',
  gold: '#EAB308',
  green: '#22A06B',
  violet: '#7C3AED',
  ink: '#15202B',
  white: '#FFFFFF',
  black: '#0B1120',
  gray50: '#F7F8FA',
  gray100: '#ECEFF3',
  gray200: '#D8DEE8',
  gray300: '#BBC5D4',
  gray400: '#8996A8',
  gray500: '#657386',
  gray600: '#4A5568',
  gray700: '#344054',
  gray800: '#1F2937',
  gray900: '#111827',
  success: '#22A06B',
  error: '#D92D20',
  warning: '#F59E0B',
  info: '#2563EB',
  background: {
    light: '#F7F8FA',
    dark: '#101820',
  },
  card: {
    light: '#FFFFFF',
    dark: '#182331',
  },
};

colors.primary = colors.ocean;
colors.primaryDark = colors.oceanDark;
colors.primaryLight = colors.oceanSoft;
colors.secondary = colors.coral;

export const categoryColors = {
  aniversario: colors.coral,
  protocolar: colors.ocean,
  cultural: colors.violet,
  musica: colors.gold,
  turismo: colors.green,
  familia: '#EC4899',
  deporte: '#2563EB',
  personal: colors.gray500,
};

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
};
