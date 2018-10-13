import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultTheme } from '../theme/defaultTheme'

export const DefaultLayout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    { children }
  </ThemeProvider>
)
