import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { colors, shadows } from '../styles/colors';
import { typography } from '../styles/typography';
import CalendarContext from '../context/CalendarContext';

// Configuración de locale para español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const CalendarView = ({ events = {}, onDateSelect }) => {
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (onDateSelect) {
      onDateSelect(day.dateString);
    }
  };

  const getMarkedDates = () => {
    const marked = {};
    
    // Marcar fechas con eventos
    Object.keys(events).forEach(date => {
      marked[date] = {
        marked: true,
        dotColor: colors.primary,
        activeOpacity: 0.8,
      };
    });
    
    // Marcar fecha seleccionada
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: colors.white,
      };
    }
    
    return marked;
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={currentMonth}
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: colors.gray600,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.white,
          todayTextColor: colors.primary,
          dayTextColor: colors.gray800,
          textDisabledColor: colors.gray300,
          dotColor: colors.primary,
          selectedDotColor: colors.white,
          arrowColor: colors.primary,
          monthTextColor: colors.gray800,
          textMonthFontWeight: typography.weights.bold,
          textDayHeaderFontWeight: typography.weights.medium,
          textDayFontSize: typography.sizes.md,
          textMonthFontSize: typography.sizes.lg,
          textDayHeaderFontSize: typography.sizes.sm,
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  calendar: {
    borderRadius: 16,
    padding: 8,
    ...shadows.small,
  },
});

export default CalendarView;