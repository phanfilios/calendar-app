import {Platform} from 'react-native';

export const typography = {
  fonts: {
    regular: Platform.select({ios: 'System', android: 'Roboto'}),
    medium: Platform.select({ios: 'System', android: 'Roboto-Medium'}),
    bold: Platform.select({ios: 'System', android: 'Roboto-Bold'}),
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 36,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
  },
};
