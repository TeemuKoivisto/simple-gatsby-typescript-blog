import * as React from 'react'

import styled, { raise } from '../theme/styled'
import avatar from '../img/avatar-460.jpeg'

interface ISignatureProps {
}

export class Signature extends React.PureComponent<ISignatureProps> {
  render() {
    return [
      <TopDivider key="first"/>,
      <SignatureContainer key="second">
        <Avatar src={avatar}/>
        <Blurb>
          <p>
            <b>Teemu Koivisto</b> is an enthusiastic student of Data Science and a software developer from Helsinki.
          </p>
        </Blurb>
      </SignatureContainer>
    ]
  }
}

const SignatureContainer = styled.div`
  align-items: center;
  background: white;
  display: flex;
`

const TopDivider = styled.hr`

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
