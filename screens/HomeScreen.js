import React, {useContext, useMemo} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CalendarView from '../components/CalendarView';
import EventCard from '../components/EventCard';
import CalendarContext from '../context/CalendarContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';
import {formatLongDate, isToday} from '../utils/dateUtils';

const getUpcomingEvents = (events, selectedDate) =>
  Object.entries(events)
    .filter(([date]) => date >= selectedDate)
    .flatMap(([date, items]) => items.map(event => ({...event, date})))
    .slice(0, 4);

const HomeScreen = () => {
  const navigation = useNavigation();
  const {selectedDate, events, isDarkMode, isLoading} =
    useContext(CalendarContext);

  const selectedEvents = events[selectedDate] || [];
  const upcomingEvents = useMemo(
    () => getUpcomingEvents(events, selectedDate),
    [events, selectedDate],
  );

  const backgroundStyle = isDarkMode ? styles.containerDark : styles.container;
  const textStyle = isDarkMode ? styles.textDark : styles.text;
  const mutedTextStyle = isDarkMode ? styles.mutedDark : styles.muted;

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loading, backgroundStyle]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.kicker, mutedTextStyle]}>
              Provincia de Ilo
            </Text>
            <Text style={[styles.title, textStyle]}>Ilo Celebra</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.iconButton, isDarkMode && styles.iconButtonDark]}
              onPress={() => navigation.navigate('Settings')}
              accessibilityRole="button"
              accessibilityLabel="Abrir configuracion">
              <Icon
                name="settings"
                size={20}
                color={isDarkMode ? colors.white : colors.ink}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryIconButton}
              onPress={() =>
                navigation.navigate('AddEvent', {date: selectedDate})
              }
              accessibilityRole="button"
              accessibilityLabel="Agregar evento">
              <Icon name="plus" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.heroLabel}>56 aniversario</Text>
            <Text style={styles.heroTitle}>
              Agenda oficial y eventos personales
            </Text>
            <Text style={styles.heroCopy}>24 abril al 31 mayo 2026</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeDay}>26</Text>
            <Text style={styles.heroBadgeMonth}>MAY</Text>
          </View>
        </View>

        <CalendarView events={events} />

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, textStyle]}>
              {isToday(selectedDate) ? 'Eventos de hoy' : 'Eventos del dia'}
            </Text>
            <Text style={[styles.sectionSubtitle, mutedTextStyle]}>
              {formatLongDate(selectedDate)}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.smallButton, isDarkMode && styles.smallButtonDark]}
            onPress={() =>
              navigation.navigate('AddEvent', {date: selectedDate})
            }>
            <Icon name="plus" size={16} color={colors.primary} />
            <Text style={styles.smallButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {selectedEvents.length > 0 ? (
          selectedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              date={selectedDate}
              isDarkMode={isDarkMode}
              onPress={() =>
                navigation.navigate('EventDetail', {
                  event,
                  date: selectedDate,
                })
              }
            />
          ))
        ) : (
          <View
            style={[styles.emptyState, isDarkMode && styles.emptyStateDark]}>
            <Icon name="calendar" size={34} color={colors.primary} />
            <Text style={[styles.emptyTitle, textStyle]}>
              Dia libre en la agenda
            </Text>
            <Text style={[styles.emptyCopy, mutedTextStyle]}>
              No hay actividades registradas para esta fecha. Puedes guardar
              recordatorios personales.
            </Text>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, textStyle]}>Proximamente</Text>
            <Text style={[styles.sectionSubtitle, mutedTextStyle]}>
              Actividades destacadas desde esta fecha
            </Text>
          </View>
        </View>

        {upcomingEvents.map(event => (
          <EventCard
            key={`${event.date}-${event.id}`}
            event={event}
            date={event.date}
            isDarkMode={isDarkMode}
            onPress={() =>
              navigation.navigate('EventDetail', {event, date: event.date})
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 18,
  },
  kicker: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.xxl,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  iconButtonDark: {
    backgroundColor: colors.card.dark,
    borderColor: '#263445',
  },
  primaryIconButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  hero: {
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 8,
    backgroundColor: colors.oceanDark,
    padding: 18,
    minHeight: 132,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  heroText: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroLabel: {
    color: colors.oceanSoft,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.white,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.xl,
    marginTop: 12,
    maxWidth: 220,
  },
  heroCopy: {
    color: colors.oceanSoft,
    fontSize: typography.sizes.sm,
    marginTop: 12,
  },
  heroBadge: {
    width: 76,
    height: 92,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroBadgeDay: {
    color: colors.coral,
    fontSize: 34,
    fontWeight: typography.weights.bold,
  },
  heroBadgeMonth: {
    color: colors.oceanDark,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  sectionSubtitle: {
    marginTop: 3,
    fontSize: typography.sizes.sm,
    textTransform: 'capitalize',
  },
  smallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  smallButtonDark: {
    backgroundColor: colors.card.dark,
    borderColor: '#263445',
  },
  smallButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  emptyState: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 24,
    alignItems: 'center',
  },
  emptyStateDark: {
    backgroundColor: colors.card.dark,
    borderColor: '#263445',
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  emptyCopy: {
    marginTop: 6,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.sm,
    textAlign: 'center',
  },
  text: {
    color: colors.ink,
  },
  textDark: {
    color: colors.white,
  },
  muted: {
    color: colors.gray600,
  },
  mutedDark: {
    color: colors.gray300,
  },
});

export default HomeScreen;
