import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarContext from '../context/CalendarContext';
import { colors, shadows } from '../styles/colors';
import { typography } from '../styles/typography';

const AddEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addEvent, isDarkMode } = useContext(CalendarContext);
  const { date } = route.params || {};
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para el evento');
      return;
    }

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      time: time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };

    await addEvent(date, eventData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={isDarkMode ? colors.white : colors.gray800} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>Nuevo Evento</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, isDarkMode && styles.textDark]}>Título</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.inputDark]}
            placeholder="Título del evento"
            placeholderTextColor={colors.gray400}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, isDarkMode && styles.textDark]}>Fecha</Text>
          <View style={[styles.dateDisplay, isDarkMode && styles.inputDark]}>
            <Icon name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.dateText, isDarkMode && styles.textDark]}>
              {new Date(date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, isDarkMode && styles.textDark]}>Hora</Text>
          <TouchableOpacity
            style={[styles.timeButton, isDarkMode && styles.inputDark]}
            onPress={() => setShowTimePicker(true)}
          >
            <Icon name="clock" size={20} color={colors.primary} />
            <Text style={[styles.timeText, isDarkMode && styles.textDark]}>
              {time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, isDarkMode && styles.textDark]}>Descripción</Text>
          <TextInput
            style={[styles.textArea, isDarkMode && styles.inputDark]}
            placeholder="Descripción del evento (opcional)"
            placeholderTextColor={colors.gray400}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      )}
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.gray800,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.gray700,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: typography.sizes.md,
    color: colors.gray800,
    backgroundColor: colors.white,
  },
  inputDark: {
    borderColor: colors.gray700,
    backgroundColor: colors.gray800,
    color: colors.white,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dateText: {
    fontSize: typography.sizes.md,
    color: colors.gray800,
    flex: 1,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  timeText: {
    fontSize: typography.sizes.md,
    color: colors.gray800,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: typography.sizes.md,
    color: colors.gray800,
    backgroundColor: colors.white,
    height: 120,
  },
  textDark: {
    color: colors.white,
  },
});

export default AddEventScreen;