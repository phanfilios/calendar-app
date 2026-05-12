import React, {useContext, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CalendarContext from '../context/CalendarContext';
import {categoryColors, colors} from '../styles/colors';
import {typography} from '../styles/typography';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const getDateDots = (dayEvents = []) =>
  dayEvents.slice(0, 3).map(event => ({
    key: event.id,
    color: categoryColors[event.category] || colors.primary,
  }));

const CalendarView = ({events = {}, onDateSelect}) => {
  const {selectedDate, setSelectedDate, isDarkMode} =
    useContext(CalendarContext);

  const markedDates = useMemo(() => {
    const marked = Object.keys(events).reduce((acc, date) => {
      acc[date] = {
        dots: getDateDots(events[date]),
      };
      return acc;
    }, {});

    if (selectedDate) {
      marked[selectedDate] = {
        ...(marked[selectedDate] || {}),
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: colors.white,
      };
    }

    return marked;
  }, [events, selectedDate]);

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    onDateSelect?.(day.dateString);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Calendar
        current={selectedDate}
        markingType="multi-dot"
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths
        hideExtraDays
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: isDarkMode ? colors.gray300 : colors.gray500,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.white,
          todayTextColor: colors.coral,
          dayTextColor: isDarkMode ? colors.white : colors.ink,
          textDisabledColor: isDarkMode ? colors.gray700 : colors.gray300,
          arrowColor: colors.primary,
          monthTextColor: isDarkMode ? colors.white : colors.ink,
          textMonthFontWeight: typography.weights.bold,
          textDayHeaderFontWeight: typography.weights.semibold,
          textDayFontSize: typography.sizes.md,
          textMonthFontSize: typography.sizes.lg,
          textDayHeaderFontSize: typography.sizes.xs,
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    overflow: 'hidden',
  },
  containerDark: {
    backgroundColor: colors.card.dark,
    borderColor: '#263445',
  },
  calendar: {
    paddingBottom: 8,
  },
});

export default CalendarView;
