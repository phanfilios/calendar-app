import React, {useContext} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AnimatedSwitch from '../components/AnimatedSwitch';
import CalendarContext from '../context/CalendarContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {isDarkMode, toggleDarkMode, userEvents, events, clearUserEvents} =
    useContext(CalendarContext);
  const officialCount = Object.values(events).reduce(
    (acc, dayEvents) => acc + dayEvents.filter(event => event.official).length,
    0,
  );
  const personalCount = Object.values(userEvents).reduce(
    (acc, dayEvents) => acc + dayEvents.length,
    0,
  );

  const handleClearData = () => {
    Alert.alert(
      'Eliminar eventos personales',
      'Se borraran solo tus eventos personales. La agenda oficial de Ilo se mantiene.',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: clearUserEvents,
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
          Ajustes
        </Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.panel, isDarkMode && styles.panelDark]}>
          <SettingRow
            icon="moon"
            label="Modo oscuro"
            isDarkMode={isDarkMode}
            right={
              <AnimatedSwitch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
              />
            }
          />
        </View>

        <View style={[styles.panel, isDarkMode && styles.panelDark]}>
          <SettingRow
            icon="flag"
            label="Actividades oficiales"
            value={String(officialCount)}
            isDarkMode={isDarkMode}
          />
          <SettingRow
            icon="star"
            label="Eventos personales"
            value={String(personalCount)}
            isDarkMode={isDarkMode}
          />
          <SettingRow
            icon="smartphone"
            label="Version"
            value="1.0.0"
            isDarkMode={isDarkMode}
          />
        </View>

        <TouchableOpacity
          style={[styles.dangerButton, isDarkMode && styles.dangerButtonDark]}
          onPress={handleClearData}>
          <Icon name="trash-2" size={18} color={colors.error} />
          <Text style={styles.dangerText}>Eliminar eventos personales</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingRow = ({icon, label, value, right, isDarkMode}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingLeft}>
      <Icon name={icon} size={19} color={colors.primary} />
      <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>
        {label}
      </Text>
    </View>
    {right || (
      <Text style={[styles.settingValue, isDarkMode && styles.mutedDark]}>
        {value}
      </Text>
    )}
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
    gap: 16,
  },
  panel: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  panelDark: {
    backgroundColor: colors.card.dark,
    borderColor: '#263445',
  },
  settingRow: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    color: colors.ink,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  settingValue: {
    color: colors.gray600,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  dangerButton: {
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FFF5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dangerButtonDark: {
    backgroundColor: '#2A1416',
    borderColor: '#7F1D1D',
  },
  dangerText: {
    color: colors.error,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  textDark: {
    color: colors.white,
  },
  mutedDark: {
    color: colors.gray300,
  },
});

export default SettingsScreen;
