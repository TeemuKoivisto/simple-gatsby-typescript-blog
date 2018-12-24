export interface IThemeColor {
  textLight: string
  textDark: string
  black: string
  bg: string
  white: string
  primary: string
  secondary: string
  danger: string
  lightGrey: string
  lightGreen: string
}

export interface ISize {
  borderWidth?: string
  fontSize?: string
  height?: string
  margin?: string
  padding?: string
  width?: string
}

export type ThemeSizeTypes = 'small' | 'medium' | 'large'

export interface IThemeSizes {
  small: ISize
  medium: ISize
  large: ISize
}

export interface ITheme {
  color: IThemeColor
  button: {
    sizes: IThemeSizes
  }
  fontSize: {
    small: string
    medium: string
    large: string
    xlarge: string
    largeIcon: string
  },
  sizes: {
    footer: string
  }
  margins: {
    default: string
  }
}
