import * as React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'

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
  padding: 100px 0 0 0;
`

const LoginForm = styled.form`
  width: 250px;
`

const LoginButton = styled(Button)`
  margin-top: 20px;
`

export const query = graphql`
  query LoginPageQuery {
    site {
      siteMetadata {
        title
        tagline
      }
    }
  }
`
