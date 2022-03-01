import { Appearance } from 'react-native';
import { useMemo } from 'react';
import { useSubscription } from 'use-subscription';

import { lightTheme } from './light';
import { darkTheme } from './dark';

export enum THEME_IDS {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

const themes = { light: lightTheme, dark: darkTheme };

export const useTheme = () => {
  const userTheme = THEME_IDS.system;

  const subscription = useMemo(
    () => ({
      getCurrentValue: () => {
        let theme = themes.light;

        if (userTheme === THEME_IDS.system) {
          theme = themes[Appearance.getColorScheme() ?? 'light'];
        } else {
          theme = themes[userTheme as 'light' | 'dark'];
        }

        return theme;
      },
      subscribe: (callback: () => void) => {
        Appearance.addChangeListener(callback);

        return () => Appearance.removeChangeListener(callback);
      },
    }),
    [userTheme],
  );

  return useSubscription(subscription);
};

export const theme =
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
