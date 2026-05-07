import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CalendarContext from '../context/CalendarContext';
import { colors, shadows } from '../styles/colors';
import { typography } from '../styles/typography';

const EventDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event, date } = route.params;
  const { deleteEvent, isDarkMode } = useContext(CalendarContext);

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Evento',
      '¿Estás seguro de que quieres eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(date, event.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={isDarkMode ? colors.white : colors.gray800} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>Detalle del Evento</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="trash-2" size={22} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.card, isDarkMode && styles.cardDark, shadows.medium]}>
          <View style={styles.iconContainer}>
            <Icon name="calendar" size={32} color={colors.primary} />
          </View>
          
          <Text style={[styles.title, isDarkMode && styles.textDark]}>{event.title}</Text>
          
          <View style={styles.infoRow}>
            <Icon name="clock" size={20} color={colors.primary} />
            <Text style={[styles.infoText, isDarkMode && styles.textSecondary]}>
              {event.time || 'Sin hora especificada'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.infoText, isDarkMode && styles.textSecondary]}>
              {new Date(date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          
          {event.description ? (
            <>
              <View style={styles.divider} />
              <Text style={[styles.descriptionLabel, isDarkMode && styles.textDark]}>
                Descripción
              </Text>
              <Text style={[styles.description, isDarkMode && styles.textSecondary]}>
                {event.description}
              </Text>
            </>
          ) : null}
          
          <View style={styles.divider} />
          <Text style={[styles.createdAt, isDarkMode && styles.textSecondary]}>
            Creado el: {new Date(event.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.gray800,
  },
  deleteButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.small,
  },
  cardDark: {
    backgroundColor: colors.gray800,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.gray800,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  infoText: {
    fontSize: typography.sizes.md,
    color: colors.gray700,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 20,
  },
  descriptionLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.gray800,
    marginBottom: 8,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.gray700,
    lineHeight: typography.lineHeights.md,
  },
  createdAt: {
    fontSize: typography.sizes.xs,
    color: colors.gray500,
    textAlign: 'center',
  },
  textDark: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.gray300,
  },
});

export default EventDetailScreen;