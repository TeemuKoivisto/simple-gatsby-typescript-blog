import * as React from 'react'
import { graphql } from 'gatsby'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Button } from '../elements/Button'
import { Input } from '../elements/Input'

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

export default class FrontPage extends React.Component<IFrontPageProps, {email: string, password: string}> {
  readonly state = {
    email: '',
    password: ''
  }
  render() {
    const { title, tagline } = this.props.data.site.siteMetadata
    return (
      <DefaultLayout>
        <div>
          <h1>Front page</h1>
          <h1>{title}</h1>
          <p>{tagline}</p>
          <Input label="email" onChange={(e) => this.setState({email: e.currentTarget.value})}/>
          <Input type="password" label="password" onChange={(e) => this.setState({password: e.currentTarget.value})}/>
          <Button>Login</Button>
        </div>
      </DefaultLayout>
    )
  }
}

export const query = graphql`
  query FrontPageQuery {
    site {
      siteMetadata {
        title
        tagline
      }
    }
  }
`
