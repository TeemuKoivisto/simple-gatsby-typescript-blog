// import * as React from 'react'
import styled, { raise } from '../theme/styled'

export const Button = styled.button`
  background-color: ${({ theme }) => theme.color.white };
  border: 1px solid ${({ theme }) => theme.color.secondary };
  border-radius: 5px;
  color: ${({ theme }) => theme.color.primary };
  cursor: pointer;
  max-width: 150px;
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
`
