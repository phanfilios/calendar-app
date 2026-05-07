import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar datos guardados
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('@calendar_events');
      const storedDarkMode = await AsyncStorage.getItem('@dark_mode');
      
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
      if (storedDarkMode) {
        setIsDarkMode(JSON.parse(storedDarkMode));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEvents = async (newEvents) => {
    try {
      await AsyncStorage.setItem('@calendar_events', JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const addEvent = async (date, eventData) => {
    const eventId = uuidv4();
    const newEvent = {
      id: eventId,
      ...eventData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedEvents = { ...events };
    if (!updatedEvents[date]) {
      updatedEvents[date] = [];
    }
    updatedEvents[date].push(newEvent);
    
    await saveEvents(updatedEvents);
    return newEvent;
  };

  const updateEvent = async (date, eventId, updatedData) => {
    const updatedEvents = { ...events };
    if (updatedEvents[date]) {
      const eventIndex = updatedEvents[date].findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        updatedEvents[date][eventIndex] = { 
          ...updatedEvents[date][eventIndex], 
          ...updatedData 
        };
        await saveEvents(updatedEvents);
      }
    }
  };

  const deleteEvent = async (date, eventId) => {
    const updatedEvents = { ...events };
    if (updatedEvents[date]) {
      updatedEvents[date] = updatedEvents[date].filter(e => e.id !== eventId);
      if (updatedEvents[date].length === 0) {
        delete updatedEvents[date];
      }
      await saveEvents(updatedEvents);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('@dark_mode', JSON.stringify(newMode));
  };

  const value = {
    selectedDate,
    setSelectedDate,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
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