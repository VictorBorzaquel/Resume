import { StackActions } from '@react-navigation/routers';
import React, { useEffect } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { SplashParamProp } from '../../routes';

import {
  Container
} from './styles';

export function Splash({ navigation }: SplashParamProp) {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      splashAnimation.value,
      [0, 25, 50],
      [1, .3, 0]
    ),
    transform: [{
      translateX: interpolate(
        splashAnimation.value,
        [0, 50],
        [0, 100],
        Extrapolate.CLAMP
      ),
    }]
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      splashAnimation.value,
      [0, 25, 50],
      [0, .3, 1]
    ),
    transform: [{
      translateX: interpolate(
        splashAnimation.value,
        [0, 50],
        [-50, 0],
        Extrapolate.CLAMP
      )
    }]
  }));

  function startApp() {
    navigation.dispatch(StackActions.replace('SignIn'));
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    );
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={80} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
