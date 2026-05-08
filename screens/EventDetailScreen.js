import React, {useContext} from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CalendarContext from '../context/CalendarContext';
import {OFFICIAL_SOURCE_URL} from '../data/iloAnniversaryEvents';
import {categoryColors, colors} from '../styles/colors';
import {typography} from '../styles/typography';
import {formatLongDate} from '../utils/dateUtils';

const EventDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {event, date} = route.params;
  const {deleteEvent, isDarkMode} = useContext(CalendarContext);
  const accent = categoryColors[event.category] || colors.primary;

  const handleDelete = () => {
    Alert.alert(
      'Eliminar evento',
      'Esta accion quitara tu evento personal del calendario.',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(date, event.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <Icon
            name="arrow-left"
            size={22}
            color={isDarkMode ? colors.white : colors.ink}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>
          Detalle
        </Text>
        {event.official ? (
          <View style={styles.iconButton} />
        ) : (
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            <Icon name="trash-2" size={20} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, isDarkMode && styles.cardDark]}>
          <View style={[styles.iconWrap, {backgroundColor: `${accent}18`}]}>
            <Icon
              name={event.official ? 'flag' : 'star'}
              size={28}
              color={accent}
            />
          </View>

          <Text style={[styles.title, isDarkMode && styles.textDark]}>
            {event.title}
          </Text>
          {event.official ? (
            <View style={[styles.officialPill, {borderColor: accent}]}>
              <Text style={[styles.officialText, {color: accent}]}>
                Actividad oficial
              </Text>
            </View>
          ) : null}

          <View style={styles.infoBlock}>
            <InfoRow
              icon="calendar"
              label={formatLongDate(date)}
              isDarkMode={isDarkMode}
            />
            <InfoRow
              icon="clock"
              label={event.time || 'Sin hora'}
              isDarkMode={isDarkMode}
            />
            {event.location ? (
              <InfoRow
                icon="map-pin"
                label={event.location}
                isDarkMode={isDarkMode}
              />
            ) : null}
          </View>

          {event.description ? (
            <View
              style={[
                styles.descriptionBox,
                isDarkMode && styles.descriptionBoxDark,
              ]}>
              <Text
                style={[
                  styles.descriptionLabel,
                  isDarkMode && styles.textDark,
                ]}>
                Notas
              </Text>
              <Text
                style={[styles.description, isDarkMode && styles.mutedDark]}>
                {event.description}
              </Text>
            </View>
          ) : null}

          {event.official ? (
            <TouchableOpacity
              style={styles.sourceButton}
              onPress={() => Linking.openURL(OFFICIAL_SOURCE_URL)}>
              <Icon name="external-link" size={16} color={colors.primary} />
              <Text style={styles.sourceButtonText}>Ver programa oficial</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({icon, label, isDarkMode}) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={18} color={colors.primary} />
    <Text style={[styles.infoText, isDarkMode && styles.mutedDark]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  containerDark: {
    backgroundColor: colors.background.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  headerDark: {
    backgroundColor: colors.background.dark,
    borderBottomColor: '#263445',
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.ink,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray100,
    padding: 22,
  },
  cardDark: {
    backgroundColor: colors.card.dark,
    borderColor: '#263445',
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    color: colors.ink,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.xxl,
  },
  officialPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 12,
  },
  officialText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
  },
  infoBlock: {
    marginTop: 22,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    flex: 1,
    color: colors.gray700,
    fontSize: typography.sizes.md,
    textTransform: 'capitalize',
  },
  descriptionBox: {
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: colors.gray50,
    padding: 16,
  },
  descriptionBoxDark: {
    backgroundColor: '#111C28',
  },
  descriptionLabel: {
    color: colors.ink,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    marginBottom: 8,
  },
  description: {
    color: colors.gray700,
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.md,
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  sourceButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  textDark: {
    color: colors.white,
  },
  mutedDark: {
    color: colors.gray300,
  },
});

export default EventDetailScreen;
