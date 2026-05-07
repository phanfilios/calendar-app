import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, shadows } from '../styles/colors';
import { typography } from '../styles/typography';

const EventCard = ({ title, date, description, onPress, isDarkMode = false }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[
        styles.card,
        isDarkMode && styles.cardDark,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.title, isDarkMode && styles.textDark]}>
              {title}
            </Text>
            <View style={[styles.dateBadge, { backgroundColor: colors.primaryLight + '20' }]}>
              <Text style={styles.dateText}>{formatDisplayDate(date)}</Text>
            </View>
          </View>
          {description && (
            <Text style={[styles.description, isDarkMode && styles.textSecondaryDark]} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 12,
    ...shadows.small,
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: colors.gray800,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.gray800,
    flex: 1,
    marginRight: 12,
  },
  textDark: {
    color: colors.white,
  },
  dateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dateText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.primary,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.gray600,
    lineHeight: typography.lineHeights.sm,
  },
  textSecondaryDark: {
    color: colors.gray300,
  },
});

export default EventCard;