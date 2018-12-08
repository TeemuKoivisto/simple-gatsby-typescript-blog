import Typography from 'typography'
import teemuTheme from './ty-teemu-theme'

const typography = Typography(teemuTheme)

// Hot reloading in dev
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
