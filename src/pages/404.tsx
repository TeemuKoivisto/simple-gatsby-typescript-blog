import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Button } from '../elements/Button'
import { MdEmail, MdLock } from 'react-icons/md'

interface IProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
      }
    }
  }
}

export default class NotFoundPage extends React.PureComponent<IProps> {
  render() {
    return (
      <DefaultLayout>
        <Container>
          <h1>404</h1>
          <p>
            Nothing here...
          </p>
          <Link to="/"><Button>Frontpage</Button></Link>
        </Container>
      </DefaultLayout>
    )
  }
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 100px 0;
`
