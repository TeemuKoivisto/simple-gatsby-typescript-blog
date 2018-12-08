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
    return (
      <DefaultLayout>
        <LoginPageContainer>
          <LoginForm onSubmit={this.handleSubmit}>

            <Input label="Email" icon={<MdEmail size={24}/>} fullWidth
              onChange={e => this.setState({ email: e.currentTarget.value })}
            />
            <Input type="password" label="Password" icon={<MdLock size={24}/>} fullWidth
              onChange={e => this.setState({ password: e.currentTarget.value })}
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
