import { DefaultTheme } from 'styled-components/native';

export const darkTheme: DefaultTheme = {
  type: 'dark',
  colors: {
    primary: '#29C0CD',
    secondary: '#31C062',

    primaryContent: '#FFFFFF',
    invertedContent: '#222222',
    green: '#31C062',
    error: '#DC335C',
    red: '#EF4129',
    orange: '#FF5C00',
    yellow: '#fEC62E',

    background: '#121212',
    backgroundPrimary: '#101326',
    white: '#FFFFFF',
    white80: 'rgba(255,255,255,0.8)',
    white60: 'rgba(255,255,255,0.6)',
    white40: 'rgba(255,255,255,0.4)',
    white20: 'rgba(255,255,255,0.2)',
    input: '#2a2a2c',
    black: '#000000',
    black80: 'rgba(0,0,0,0.8)',
    black60: 'rgba(0,0,0,0.6)',
    black40: 'rgba(0,0,0,0.4)',
    black20: 'rgba(0,0,0,0.2)',
    text: '#fff',
    text20: 'rgba(255, 255, 255, 0.2)',
    text40: 'rgba(255, 255, 255, 0.4)',
    text60: 'rgba(255, 255, 255, 0.6)',
    text80: 'rgba(255, 255, 255, 0.8)',
    border: '#2d2d2f',
  },
  fonts: {
    size: {
      xs: 10,
      s: 12,
      m: 14,
      l: 16,
      xl: 18,
      xxl: 20,
      xxxl: 24,
      x64: 32,
    },
    weight: {
      regular: 'Lato-Regular',
      bold: 'Lato-Bold',
      italic: 'Lato-Italic',
    },
  },
  shadows: {
    default: global.isIOS
      ? 'box-shadow: 0px 2px 16px rgba(255,255,255, 0.08)'
      : 'elevation: 3',
    light: global.isIOS
      ? 'box-shadow: 0px 2px 16px rgba(255,255,255, 0.08)'
      : 'elevation: 2',
    medium: global.isIOS
      ? 'box-shadow: 0px 2px 5px rgba(255,255,255, 0.2)'
      : 'elevation: 3',
    strong: global.isIOS
      ? 'box-shadow: 0px 2px 6px rgba(255,255,255, 0.4)'
      : 'elevation: 4',
  },
  headers: global.hasNotch
    ? {
        main: global.isIOS ? 54 : 24,
        inner: global.isIOS ? 50 : 24,
        paralax: global.isIOS ? 45 : 35,
      }
    : {
        main: global.isIOS ? 30 : 20,
        inner: global.isIOS ? 30 : 0,
        paralax: global.isIOS ? 25 : 35,
      },
  padding: {
    defaultHorizontal: 16,
    defaultVertical: 12,
  },
};
