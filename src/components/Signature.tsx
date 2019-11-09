import * as React from 'react'

import styled from '../theme/styled'
import avatar from '../img/avatar-460.jpeg'

export function Signature() {
  return (
    <>
      <TopDivider/>
      <SignatureContainer>
        <Avatar src={avatar} alt="Picture of my beautiful face"/>
        <Blurb>
          <p>
            Hi, I'm <b>Teemu Koivisto</b>. A software developer and MSc. student of Data Science from Helsinki.
            When I'm not doing the boring stuff, I like practising music, lifting weights and getting high on heroin.
            One of those was a lie.
          </p>
        </Blurb>
      </SignatureContainer>
      <TopDivider/>
    </>
  )
}

const SignatureContainer = styled.div`
  align-items: center;
  display: flex;
`

const TopDivider = styled.hr`
  margin: 2rem 0 2rem 0;
`

const Avatar = styled.img`
  border-radius: 100%;
  height: 4rem;
`

const Blurb = styled.article`
  margin-left: 20px;
  & > p {
    margin: 0;
  }
`
