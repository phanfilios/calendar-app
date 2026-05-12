import React, {createContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILO_ANNIVERSARY_EVENTS} from '../data/iloAnniversaryEvents';
import {getToday} from '../utils/dateUtils';

const CalendarContext = createContext();

const EVENTS_KEY = '@ilo_calendar_user_events';
const DARK_MODE_KEY = '@ilo_calendar_dark_mode';

const createEventId = () =>
  `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const sortEvents = (items = []) =>
  [...items].sort((a, b) => {
    const first = a.time || '99:99';
    const second = b.time || '99:99';
    return first.localeCompare(second);
  });

const mergeEvents = (officialEvents, userEvents) => {
  const dates = new Set([
    ...Object.keys(officialEvents),
    ...Object.keys(userEvents),
  ]);

  return [...dates].reduce((acc, date) => {
    acc[date] = sortEvents([
      ...(officialEvents[date] || []),
      ...(userEvents[date] || []),
    ]);
    return acc;
  }, {});
};

export const CalendarProvider = ({children}) => {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [userEvents, setUserEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const events = useMemo(
    () => mergeEvents(ILO_ANNIVERSARY_EVENTS, userEvents),
    [userEvents],
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedEvents, storedDarkMode] = await Promise.all([
        AsyncStorage.getItem(EVENTS_KEY),
        AsyncStorage.getItem(DARK_MODE_KEY),
      ]);

      if (storedEvents) {
        setUserEvents(JSON.parse(storedEvents));
      }
      if (storedDarkMode) {
        setIsDarkMode(JSON.parse(storedDarkMode));
      }
    } catch (error) {
      console.warn('No se pudieron cargar los datos del calendario', error);
    } finally {
      setIsLoading(false);
    }
  };

  const persistUserEvents = async nextEvents => {
    setUserEvents(nextEvents);
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(nextEvents));
  };

  const addEvent = async (date, eventData) => {
    const nextEvent = {
      id: createEventId(),
      category: 'personal',
      official: false,
      ...eventData,
      createdAt: new Date().toISOString(),
    };

    const nextEvents = {
      ...userEvents,
      [date]: sortEvents([...(userEvents[date] || []), nextEvent]),
    };

    await persistUserEvents(nextEvents);
    return nextEvent;
  };

  const deleteEvent = async (date, eventId) => {
    const nextEvents = {...userEvents};

    if (!nextEvents[date]) {
      return;
    }

    nextEvents[date] = nextEvents[date].filter(event => event.id !== eventId);
    if (nextEvents[date].length === 0) {
      delete nextEvents[date];
    }

    await persistUserEvents(nextEvents);
  };

  const clearUserEvents = async () => {
    await persistUserEvents({});
  };

  const toggleDarkMode = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(nextMode));
  };

  const value = {
    selectedDate,
    setSelectedDate,
    events,
    userEvents,
    addEvent,
    deleteEvent,
    clearUserEvents,
    isLoading,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContext;
