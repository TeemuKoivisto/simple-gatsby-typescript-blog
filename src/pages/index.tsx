import * as React from 'react'
import { graphql } from 'gatsby'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Button } from '../elements/Button'

interface IFrontPageProps {
  data: IFrontPageQuery
}

interface IFrontPageQuery {
  site: {
    siteMetadata: {
      title: string
      tagline: string
    }
  }
}

export default class FrontPage extends React.PureComponent<IFrontPageProps> {
  get graphqlProps() {
    return this.props.data as IFrontPageQuery
  }
  render() {
    const { title, tagline } = this.graphqlProps.site.siteMetadata
    return (
      <DefaultLayout>
        <div>
          <h1>Front page</h1>
          <h1>{title}</h1>
          <p>{tagline}</p>
          <Button>I am a button</Button>
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
