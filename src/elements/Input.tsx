import * as React from 'react'
import styled from '../theme/styled'

interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  type?: string
}

export const Input: React.SFC<IInputProps> = ({ label, ...props }: IInputProps) => (
  <InputContainer>
    <label>{label}</label>
    <StyledInput {...props}></StyledInput>
  </InputContainer>
)

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    padding: 2px 0 2px 0;
  }
`

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.color.white };
  border: 1px solid ${({ theme }) => theme.color.textDark };
  border-radius: 4px;
  color: ${({ theme }) => theme.color.textDark };
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.medium };
  max-width: 150px;
  padding: 3px 10px 7px 10px;
  text-decoration: none;
  &:focus {
    background-image: linear-gradient(to right, #cefff8, #729EE74D);
    color: ${({ theme }) => theme.color.textDark };
  }
  transition: 0.1s all;
`
