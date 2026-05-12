import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {categoryColors, colors, shadows} from '../styles/colors';
import {typography} from '../styles/typography';
import {formatShortDate} from '../utils/dateUtils';

const CATEGORY_ICONS = {
  aniversario: 'flag',
  protocolar: 'award',
  cultural: 'book-open',
  musica: 'music',
  turismo: 'map-pin',
  familia: 'heart',
  deporte: 'activity',
  personal: 'star',
};

const EventCard = ({event, date, onPress, isDarkMode = false}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const category = event.category || 'personal';
  const accent = categoryColors[category] || colors.primary;

  const animateScale = toValue => {
    Animated.spring(scaleAnim, {
      toValue,
      friction: 7,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => animateScale(0.985)}
      onPressOut={() => animateScale(1)}
      activeOpacity={0.92}
      accessibilityRole="button"
      accessibilityLabel={`Abrir evento ${event.title}`}>
      <Animated.View
        style={[
          styles.card,
          isDarkMode && styles.cardDark,
          {transform: [{scale: scaleAnim}]},
        ]}>
        <View style={[styles.accentBar, {backgroundColor: accent}]} />
        <View style={styles.content}>
          <View style={[styles.iconWrap, {backgroundColor: `${accent}18`}]}>
            <Icon
              name={CATEGORY_ICONS[category] || 'calendar'}
              size={18}
              color={accent}
            />
          </View>

          <View style={styles.body}>
            <View style={styles.headerRow}>
              <Text
                style={[styles.title, isDarkMode && styles.textDark]}
                numberOfLines={2}>
                {event.title}
              </Text>
              {event.official ? (
                <View style={[styles.officialPill, {borderColor: accent}]}>
                  <Text style={[styles.officialText, {color: accent}]}>
                    Oficial
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.metaRow}>
              <Icon
                name="clock"
                size={14}
                color={isDarkMode ? colors.gray300 : colors.gray500}
              />
              <Text
                style={[styles.metaText, isDarkMode && styles.metaTextDark]}>
                {event.time || 'Sin hora'}
              </Text>
              <Text style={[styles.dot, isDarkMode && styles.metaTextDark]}>
                •
              </Text>
              <Text
                style={[styles.metaText, isDarkMode && styles.metaTextDark]}>
                {formatShortDate(date)}
              </Text>
            </View>

            {event.location ? (
              <View style={styles.metaRow}>
                <Icon
                  name="map-pin"
                  size={14}
                  color={isDarkMode ? colors.gray300 : colors.gray500}
                />
                <Text
                  style={[styles.metaText, isDarkMode && styles.metaTextDark]}
                  numberOfLines={1}>
                  {event.location}
                </Text>
              </View>
            ) : null}

            {event.description ? (
              <Text
                style={[styles.description, isDarkMode && styles.metaTextDark]}
                numberOfLines={2}>
                {event.description}
              </Text>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    ...shadows.small,
  },
  cardDark: {
    backgroundColor: colors.card.dark,
  },
  accentBar: {
    height: 4,
  },
  content: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  title: {
    flex: 1,
    color: colors.ink,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.md,
  },
  officialPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  officialText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    gap: 6,
  },
  metaText: {
    color: colors.gray600,
    fontSize: typography.sizes.sm,
    flexShrink: 1,
  },
  dot: {
    color: colors.gray400,
  },
  description: {
    color: colors.gray600,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.sm,
    marginTop: 8,
  },
  textDark: {
    color: colors.white,
  },
  metaTextDark: {
    color: colors.gray300,
  },
});

export default EventCard;
