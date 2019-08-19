import * as React from 'react'
import styled, { raise } from '../theme/styled'

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  type?: string
  fullWidth?: boolean
}

function ButtonEl(props: IProps) {
  const { ...rest } = props
  return (
    <StyledButton { ...rest }>
      { props.children }
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.color.white };
  border: 1px solid ${({ theme }) => theme.color.secondary };
  border-radius: 5px;
  color: ${({ theme }) => theme.color.primary };
  cursor: pointer;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
  text-transform: uppercase;
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
export const Button = styled(ButtonEl)``
