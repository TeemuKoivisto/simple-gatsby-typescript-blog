import Typography from 'typography'
import teemuTheme from './teemu-theme'

const typography = new Typography(teemuTheme)

// Hot reloading in dev
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale