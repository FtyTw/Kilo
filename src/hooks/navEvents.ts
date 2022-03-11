import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useFocusBackHandler = (BackHandlerFunc: typeof Function) => {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', BackHandlerFunc);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', BackHandlerFunc);
    }, [BackHandlerFunc]),
  );
};
