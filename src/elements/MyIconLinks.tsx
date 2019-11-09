import * as React from 'react'

import styled from '../theme/styled'
// IoMdMail IoLogoLinkedin IoLogoGithub
import { IoMdMail, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

function MyIconLinksEl(props: IProps) {
  return (
    <Container className={props.className}>
      <Links>
        <IconLink href="mailto:teemukoivisto.xyz@gmail.com">
          <IoMdMail size={24}/>
        </IconLink>
        <IconLink href="https://github.com/teemukoivisto">
          <IoLogoGithub size={24}/>
        </IconLink>
        <IconLink href="https://www.linkedin.com/in/teemu-koivisto-75304b114">
          <IoLogoLinkedin size={24}/>
        </IconLink>
      </Links>
      <EmailText>teemukoivisto.xyz@gmail.com</EmailText>
    </Container>
  )
}
export const MyIconLinks = styled(MyIconLinksEl)`
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const EmailText = styled.small`
  color: #fff;
`
const Links = styled.div`
  display: flex;
`
const IconLink = styled.a`
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  &:not(:last-child) {
    margin-right: 10px;
  }
`
