import React, {useContext, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CalendarContext from '../context/CalendarContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';
import {formatLongDate, getToday} from '../utils/dateUtils';

const formatTime = date =>
  date.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

const AddEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {addEvent, isDarkMode} = useContext(CalendarContext);
  const date = route.params?.date || getToday();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const textStyle = isDarkMode ? styles.textDark : styles.text;

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert(
        'Falta el titulo',
        'Escribe un nombre para guardar el evento.',
      );
      return;
    }

    await addEvent(date, {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      time: formatTime(time),
    });

    navigation.goBack();
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
        <Text style={[styles.headerTitle, textStyle]}>Nuevo evento</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Icon name="check" size={18} color={colors.white} />
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <Text style={[styles.dateLabel, isDarkMode && styles.mutedDark]}>
            {formatLongDate(date)}
          </Text>

          <View style={styles.formGroup}>
            <Text style={[styles.label, textStyle]}>Titulo</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              placeholder="Ej. Reunirnos para la serenata"
              placeholderTextColor={colors.gray400}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, textStyle]}>Hora</Text>
            <TouchableOpacity
              style={[styles.fieldButton, isDarkMode && styles.inputDark]}
              onPress={() => setShowTimePicker(true)}>
              <Icon name="clock" size={18} color={colors.primary} />
              <Text style={[styles.fieldButtonText, textStyle]}>
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, textStyle]}>Lugar</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              placeholder="Plaza, casa, auditorio..."
              placeholderTextColor={colors.gray400}
              value={location}
              onChangeText={setLocation}
              maxLength={120}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, textStyle]}>Notas</Text>
            <TextInput
              style={[styles.textArea, isDarkMode && styles.inputDark]}
              placeholder="Detalles importantes del evento"
              placeholderTextColor={colors.gray400}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {showTimePicker ? (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedTime) => {
            setShowTimePicker(Platform.OS === 'ios');
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  containerDark: {
    backgroundColor: colors.background.dark,
  },
  keyboard: {
    flex: 1,
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
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  dateLabel: {
    color: colors.gray600,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    paddingHorizontal: 14,
    color: colors.ink,
    backgroundColor: colors.white,
    fontSize: typography.sizes.md,
  },
  inputDark: {
    borderColor: '#263445',
    backgroundColor: colors.card.dark,
    color: colors.white,
  },
  fieldButton: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fieldButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  textArea: {
    minHeight: 132,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingTop: 14,
    color: colors.ink,
    backgroundColor: colors.white,
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.md,
  },
  text: {
    color: colors.ink,
  },
  textDark: {
    color: colors.white,
  },
  mutedDark: {
    color: colors.gray300,
  },
});

export default AddEventScreen;
