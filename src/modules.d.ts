/* eslint-disable no-var */
// noinspection ES6ConvertVarToLetConst

declare module 'reactotron-react-native/dist/flipper';

declare namespace globalThis {
  var width: number;
  var height: number;
  var aspectRatio: number;
  var timeFormat: string;
  var isSmallScreen: boolean;
  var isSmallHeight: boolean;
  var isIOS: boolean;
  var hasNotch: boolean;
  var brand: string;
  var localeId: string;
}
