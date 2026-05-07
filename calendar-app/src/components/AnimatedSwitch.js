import React from 'react';
import { Switch } from 'react-native';

const AnimatedSwitch = ({ value, onValueChange }) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor="#fff"
      trackColor={{ false: '#767577', true: '#81b0ff' }}
    />
  );
};

export default AnimatedSwitch;
