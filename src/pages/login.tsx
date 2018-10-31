import * as React from 'react'
import { graphql } from 'gatsby'

import styled, { raise } from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Button } from '../elements/Button'
import { Input } from '../elements/Input'
import { MdEmail, MdLock } from 'react-icons/md'

interface IFrontPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
      }
    }
  }
}

interface IState {
  email: string
  password: string
}

export default class FrontPage extends React.Component<IFrontPageProps, IState> {
  readonly state = {
    email: '',
    password: ''
  }
  handleSubmit = async (e: React.FormEvent) : Promise<void> => {
    e.preventDefault()
    const success = await Promise.resolve(false)
    if (success) {
      // this.props.history.push('')
    }
  }
  render() {
    const { title, tagline } = this.props.data.site.siteMetadata
    return (
      <DefaultLayout>
        <LoginPageContainer>
          <LoginForm onSubmit={this.handleSubmit}>

            <Input label="Email" icon={<MdEmail size={24}/>} fullWidth
              onChange={(e) => this.setState({email: e.currentTarget.value})}
            />
            <Input type="password" label="Password" icon={<MdLock size={24}/>} fullWidth
              onChange={(e) => this.setState({password: e.currentTarget.value})}
            />
            <LoginButton type="submit" fullWidth>Login</LoginButton>

          </LoginForm>
        </LoginPageContainer>
      </DefaultLayout>
    )
  }
}

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 150px 0 0 0;
  /* &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    clip-path: polygon(72% 74%,100% 27%,100% 100%,5% 100%);
    background: #00809f;
    background-size: cover;
    display: block;
    content: ' ';
    z-index: -1;
    height: 100%;
    opacity: 0.9;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2eb6f2;
    background-size: cover;
    z-index: -2;
    display: block;
    content: ' ';
    clip-path: polygon(0% 0%,117% 0,72% 74%,0% 102%);
  } */
`

const LoginForm = styled.form`
  background-color: #d2d2d252;
  border-radius: 0.2rem;
  padding: 2rem;
  width: 300px;
  ${raise(2)};
`

const LoginButton = styled(Button)`
  margin-top: 32px;
`

export const query = graphql`
  query LoginPageQuery {
    site {
      ...SiteData
    }
  }
`
