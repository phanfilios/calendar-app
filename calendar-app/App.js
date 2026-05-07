import React from 'react';
import { CalendarProvider } from './src/context/CalendarContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <CalendarProvider>
      <AppNavigator />
    </CalendarProvider>
  );
};

export default App;