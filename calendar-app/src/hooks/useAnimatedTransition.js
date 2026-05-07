import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimatedTransition = (initialValue = 0) => {
  const animation = useRef(new Animated.Value(initialValue)).current;

  const animateTo = (toValue, duration = 300) => {
    return new Promise((resolve) => {
      Animated.timing(animation, {
        toValue,
        duration,
        useNativeDriver: false,
      }).start(() => resolve());
    });
  };

  return {
    animation,
    animateTo,
  };
};

export default useAnimatedTransition;
