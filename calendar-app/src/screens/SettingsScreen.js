import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CalendarContext from '../context/CalendarContext';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleDarkMode, events } = useContext(CalendarContext);

  const totalEvents = Object.values(events).reduce((acc, curr) => acc + curr.length, 0);

  const handleClearData = () => {
    Alert.alert(
      'Limpiar Datos',
      '¿Estás seguro de que quieres eliminar todos los eventos? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar Todo',
          style: 'destructive',
          onPress: () => {
            // Implementar limpieza de datos
            Alert.alert('Éxito', 'Todos los eventos han sido eliminados');
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Apariencia',
      items: [
        {
          icon: 'moon',
          label: 'Modo Oscuro',
          type: 'switch',
          value: isDarkMode,
          onValueChange: toggleDarkMode,
        },
      ],
    },
    {
      title: 'Información',
      items: [
        {
          icon: 'calendar',
          label: 'Total de Eventos',
          value: totalEvents.toString(),
          type: 'info',
        },
        {
          icon: 'info',
          label: 'Versión',
          value: '1.0.0',
          type: 'info',
        },
      ],
    },
    {
      title: 'Datos',
      items: [
        {
          icon: 'trash-2',
          label: 'Limpiar Todos los Eventos',
          type: 'button',
          onPress: handleClearData,
          danger: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={isDarkMode ? colors.white : colors.gray800} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>Configuración</Text>
        <View style={styles.placeholder} />
      </View>

      {settingsSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textSecondary]}>
            {section.title}
          </Text>
          <View style={[styles.sectionCard, isDarkMode && styles.sectionCardDark]}>
            {section.items.map((item, itemIndex) => (
              <View
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex < section.items.length - 1 && styles.settingItemBorder,
                ]}
              >
                <View style={styles.settingLeft}>
                  <Icon
                    name={item.icon}
                    size={22}
                    color={item.danger ? colors.error : colors.primary}
                  />
                  <Text
                    style={[
                      styles.settingLabel,
                      item.danger && styles.dangerText,
                      isDarkMode && styles.textDark,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{ false: colors.gray300, true: colors.primary }}
                    thumbColor={colors.white}
                  />
                )}
                {item.type === 'info' && (
                  <Text style={[styles.settingValue, isDarkMode && styles.textSecondary]}>
                    {item.value}
                  </Text>
                )}
                {item.type === 'button' && (
                  <TouchableOpacity onPress={item.onPress}>
                    <Icon name="chevron-right" size={20} color={colors.gray400} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
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
  placeholder: {
    width: 40,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.gray600,
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionCardDark: {
    backgroundColor: colors.gray800,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: typography.sizes.md,
    color: colors.gray800,
  },
  settingValue: {
    fontSize: typography.sizes.md,
    color: colors.gray600,
  },
  dangerText: {
    color: colors.error,
  },
  textDark: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.gray400,
  },
});

export default SettingsScreen;