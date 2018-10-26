import { ITheme } from '../interfaces/theme'
import { createGlobalStyle } from 'styled-components'

export const defaultTheme : ITheme = {
  color: {
    textLight: '#666',
    textDark: '#222',
    bg: '#fff',
    white: '#fff',
    primary: '#2979FF',
    secondary: '#82B1FF',
    danger: '#e93e2e',
    lightGrey: '#aaa',
  },
  button: {
    sizes: {
      small: {
        fontSize: '14px',
        height: '30px',
        padding: '0 8px',
      },
      medium: {
        fontSize: '16px',
        height: '40px',
        padding: '0 12px',
      },
      large: {
        fontSize: '18px',
        height: '50px',
        padding: '0 16px',
      },
    }
  },
  fontSize: {
    small: '16px',
    medium: '18px',
    large: '24px',
    xlarge: '40px',
    largeIcon: '50px'
  },
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
   body,
   input,
   * {
    box-sizing: border-box;
   }
   ul, ol {
    list-style: none;
   }
`