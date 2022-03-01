import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    type: string;
    colors: AppColors;
    fonts: {
      size: {
        xs: number;
        s: number;
        m: number;
        l: number;
        xl: number;
        xxl: number;
        xxxl: number;
        x64: number;
      };
      weight: {
        regular: string;
        bold: string;
        italic: string;
      };
    };
    shadows: {
      default: string;
      light: string;
      medium: string;
      strong: string;
    };
    headers: {
      main: number;
      inner: number;
      paralax: number;
    };
    hitSlop?: {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    };
    padding: {
      defaultHorizontal: number;
      defaultVertical: number;
    };
  }
}

export interface AppColors {
  primary: string;
  secondary: string;

  primaryContent: string;
  invertedContent: string;
  green: string;
  error: string;
  red: string;
  orange: string;
  yellow: string;
  background: string;
  backgroundPrimary: string;
  white: string;
  white80: string;
  white60: string;
  white40: string;
  white20: string;
  input: string;
  black: string;
  black80: string;
  black60: string;
  black40: string;
  black20: string;
  text: string;
  text20: string;
  text40: string;
  text60: string;
  text80: string;
  border: string;
}
