import gray from 'gray-percentage'
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from './theme-breakpoints'

// Uses typography-theme-sutro as its base
// https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-sutro/src/index.js
const theme = {
  title: 'Teemu-theme',
  baseFontSize: '16px',
  baseLineHeight: 1.78,
  // scaleRatio: 2,
  googleFonts: [
    {
      name: 'Open Sans',
      styles: ['700'],
    },
    {
      name: 'Merriweather',
      styles: ['300', '700'],
    },
  ],
  headerFontFamily: ['Open Sans', 'sans-serif'],
  bodyFontFamily: ['Merriweather', 'Georgia', 'serif'],
  bodyColor: 'hsla(0,0%,0%,0.9)',
  headerWeight: 700,
  bodyWeight: 300,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      textDecoration: 'underline',
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid ${gray(80)}`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    [TABLET_MEDIA_QUERY]: {
      h1: {
        ...scale(5 / 5),
      },
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(1),
    },
    h1: {
      ...scale(6 / 5),
      letterSpacing: '-2px',
      textShadow: '1px 1px 0px rgba(162, 162, 162, 0.38)',
    },
    h6: {
      fontStyle: 'italic',
    },
    p: {
      marginBottom: rhythm(0.5),
    }
  }),
}

export default theme
