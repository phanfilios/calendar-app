import { colors } from './colors';
import { typography } from './typography';

export const createTheme = (isDarkMode = false) => ({
  colors: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    secondary: colors.secondary,
    secondaryDark: colors.secondaryDark,
    secondaryLight: colors.secondaryLight,
    
    background: isDarkMode ? colors.background.dark : colors.background.light,
    surface: isDarkMode ? colors.card.dark : colors.card.light,
    text: isDarkMode ? colors.white : colors.black,
    textSecondary: isDarkMode ? colors.gray300 : colors.gray600,
    border: isDarkMode ? colors.gray700 : colors.gray200,
    
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
  },
  typography,
  spacing: (factor) => factor * 8,
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    round: 999,
  },
});