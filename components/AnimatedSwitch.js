import React from 'react';
import {Switch} from 'react-native';
import {colors} from '../styles/colors';

const AnimatedSwitch = ({value, onValueChange}) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    thumbColor={colors.white}
    trackColor={{false: colors.gray300, true: colors.primary}}
    ios_backgroundColor={colors.gray300}
  />
);

export default AnimatedSwitch;
