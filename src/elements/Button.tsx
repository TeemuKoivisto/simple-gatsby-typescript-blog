import * as React from 'react'
import styled, { raise } from '../theme/styled'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  type?: string
  fullWidth?: boolean
}

class ButtonClass extends React.PureComponent<IButtonProps> {
  public render() {
    const { ...rest } = this.props
    return (
      <StyledButton { ...rest }>
        { this.props.children }
      </StyledButton>
    )
  }
}

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.color.white };
  border: 1px solid ${({ theme }) => theme.color.secondary };
  border-radius: 5px;
  color: ${({ theme }) => theme.color.primary };
  cursor: pointer;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white };
    ${raise(2)};
  }
  transition: 0.1s all;
  width: ${({ fullWidth }) => fullWidth ? '100%' : '150px' };
`

// Intercept props from being passed down to the DOM element
// https://github.com/styled-components/styled-components/issues/135
// And also expose StyledComponents component rather than React component, it's nicer this way. Trust me
export const Button = styled(ButtonClass)``
