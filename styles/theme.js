import {colors} from './colors';
import {typography} from './typography';

export const createTheme = (isDarkMode = false) => ({
  colors: {
    primary: colors.primary,
    accent: colors.coral,
    background: isDarkMode ? colors.background.dark : colors.background.light,
    surface: isDarkMode ? colors.card.dark : colors.card.light,
    text: isDarkMode ? colors.white : colors.ink,
    textSecondary: isDarkMode ? colors.gray300 : colors.gray600,
    border: isDarkMode ? '#263445' : colors.gray100,
  },
  typography,
  spacing: factor => factor * 8,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
});
