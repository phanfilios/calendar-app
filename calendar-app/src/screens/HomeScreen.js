import React, { useContext, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  RefreshControl, SafeAreaView, StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CalendarView from '../components/CalendarView';
import EventCard from '../components/EventCard';
import CalendarContext from '../context/CalendarContext';
import { colors, shadows } from '../styles/colors';
import { typography } from '../styles/typography';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { selectedDate, events, isDarkMode, setSelectedDate } = useContext(CalendarContext);
  const [refreshing, setRefreshing] = useState(false);

  const todayEvents = selectedDate ? (events[selectedDate] || []) : [];
  
  const today = new Date().toISOString().split('T')[0];
  const isTodaySelected = selectedDate === today;

  const onRefresh = async () => {
    setRefreshing(true);
    // Recargar datos del contexto
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="calendar" size={64} color={colors.gray300} />
      <Text style={[styles.emptyText, isDarkMode && styles.textDark]}>
        No hay eventos para este día
      </Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEvent', { date: selectedDate })}
      >
        <Icon name="plus" size={20} color={colors.white} />
        <Text style={styles.addButtonText}>Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>
          Minimal Calendar
        </Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" size={24} color={isDarkMode ? colors.white : colors.gray800} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarView 
          events={events}
          onDateSelect={(date) => setSelectedDate(date)}
        />
        
        <View style={styles.eventsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
              {isTodaySelected ? 'Eventos de Hoy' : 'Eventos'}
            </Text>
            <TouchableOpacity 
              style={styles.addEventButton}
              onPress={() => navigation.navigate('AddEvent', { date: selectedDate })}
            >
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          {todayEvents.length > 0 ? (
            todayEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={selectedDate}
                description={event.description}
                isDarkMode={isDarkMode}
                onPress={() => navigation.navigate('EventDetail', { event, date: selectedDate })}
              />
            ))
          ) : (
            renderEmptyState()
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerDark: {
    backgroundColor: colors.gray900,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.gray800,
  },
  settingsButton: {
    padding: 8,
  },
  eventsSection: {
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.gray800,
  },
  addEventButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.gray500,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    ...shadows.small,
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginLeft: 8,
  },
  textDark: {
    color: colors.white,
  },
});

export default HomeScreen;