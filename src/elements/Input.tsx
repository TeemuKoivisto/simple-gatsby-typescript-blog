import * as React from 'react'
import styled from '../theme/styled'

interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  type?: string
  icon?: React.ReactElement<any>
}

export const Input: React.SFC<IInputProps> = ({ label, icon, ...props }: IInputProps) => (
  <InputWrapper>
    <label>{label}</label>
    <InputContainer>
      { icon }
      <StyledInput {...props} className={`${icon ? 'has-icon' : ''}`}></StyledInput>
    </InputContainer>
  </InputWrapper>
)

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    padding: 2px 0 2px 0;
  }
`

const InputContainer = styled.div`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.textDark };
  display: flex;
  max-width: 150px;
  &:focus {
    background-image: linear-gradient(to right, #cefff8, #729EE74D);
    color: ${({ theme }) => theme.color.textDark };
    outline: auto 5px;
  }
  & > svg {
    padding: 0 0 0 5px;
    position: absolute;
  }
`

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.color.white };
  border: 0;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.textDark };
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.medium };
  padding: 0.5rem 0.5rem;
  text-decoration: none;
  transition: 0.1s all;
  width: 100%;
  &:focus {
    background-image: linear-gradient(to right,#fcffff,#bbecff4d);
    color: ${({ theme }) => theme.color.textDark };
  }
  &.has-icon {
    padding-left: 36px;
  }
`
