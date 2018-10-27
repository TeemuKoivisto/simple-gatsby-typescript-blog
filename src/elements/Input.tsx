import * as React from 'react'
import styled from '../theme/styled'

interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  type?: string
  icon?: React.ReactElement<any>
  fullWidth?: boolean
}

export const Input: React.SFC<IInputProps> = ({ label, ...props }: IInputProps) => (
  <InputWrapper>
    { label && <label>{label}</label> }
    <InputContainer {...props}>
      { props.icon }
      <StyledInput {...props}></StyledInput>
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
  border-radius: 4px;
  display: flex;
  position: relative;
  width: ${({ fullWidth }) => fullWidth ? '100%' : '150px' };
  &:focus {
    background-image: linear-gradient(to right, #cefff8, #729EE74D);
    color: ${({ theme }) => theme.color.textDark };
    outline: auto 5px;
  }
  & > svg {
    left: 8px;
    position: absolute;
  }
`

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.color.white };
  border: 0;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.textDark };
  font-size: ${({ theme }) => theme.fontSize.medium };
  padding: 0.5rem 0.5rem;
  padding-left: ${({ icon }) => icon ? '40px' : '10px'};
  text-decoration: none;
  transition: 0.1s all;
  width: 100%;
  &:focus {
    background-image: linear-gradient(to right,#fcffff,#e6f8ff4d);
    color: ${({ theme }) => theme.color.textDark };
  }
  /* &.has-icon {
    padding-left: 40px;
  } */
`
