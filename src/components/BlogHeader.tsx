import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { MdEvent, MdLocalOffer } from 'react-icons/md'

interface IBlogHeaderProps {
  frontmatter: {
    title: string
    date: Date
    tags: string[]
  }
}

export class BlogHeader extends React.PureComponent<IBlogHeaderProps> {
  render() {
    const { title, date, tags } = this.props.frontmatter
    return (
      <BlogHeaderContainer>
        <h1>{ title }</h1>
        <Info>
          <BlogDate>
            <SvgWrapper><MdEvent size={24}/></SvgWrapper>
            { date }
          </BlogDate>
          <SvgWrapper><MdLocalOffer size={24}/></SvgWrapper>
          <Tags>
            { tags.map((t, i) =>
            <Tag key={i}>{t}</Tag>
            )}
          </Tags>
        </Info>
      </BlogHeaderContainer>
    )
  }
}

const BlogHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem; // TODO use rhythm??
  & > h1 {
    margin-bottom: 0.5rem;
  }
`
const Info = styled.div`
  align-items: center;
  display: flex;
`
const BlogDate = styled.div`
  align-items: center;
  display: flex;
  margin-right: 20px;
`
// Keeps svgs from resizing themselves into oblivion
const SvgWrapper = styled.div`
  display: flex;
  margin-right: 10px;
`
const Tags = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`
const Tag = styled.p`
  background: #ff3354c9;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  margin: 0 5px 5px 0;
  padding: 0 3px 0 3px;
  ${raise(1)};
`
