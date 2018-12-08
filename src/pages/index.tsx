import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { DefaultLayout } from '../layouts/DefaultLayout'

import { IBlogPosts, INode } from '../types/graphql'

interface IFrontPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    },
    allMarkdownRemark: IBlogPosts
  }
}

export default class FrontPage extends React.PureComponent<IFrontPageProps> {
  render() {
    const { data: { allMarkdownRemark } } = this.props
    return (
      <DefaultLayout>
        <div>
          <h1>Hi there!</h1>
          <p>
            You have happened to stumble upon my curious blog. Don't panic, there's no cameras here.
          </p>
          <p>
            The purpose of this blog is simply share and spread knowledge throughout the internet.
            For a long time I've wanted make something of my own where I could write and share stuff
            about things in length. This is not a facebook post spam machine.
          </p>
          <h2>About me</h2>
          <p>
            Who am I? Well that is a question... Simply, I am currently a student of Data Science in University
            of Helsinki. Also I'm part-time employed, much of this can be found from Linkedin.
          </p>
          <p>
            To go into more into detail, well. I am native finnish male, born in Raisio but lived most of my life
            in Hyvinkää. A smallish city somewhere north of Helsinki. Then as I got fed up with Hyvinkää, I moved to
            Helsinki to study. Hmm... time flies.
          </p>
          <p>
            Since this blog is not about my personal history, I'll skip into my technical skills. I am a somewhat
            proficient programmer in TypeScript/JavaScript who knows his way around Node.js, React, Vue with HTML/SCSS/CSS
            mixed in. This is what I mainly do at work and know how to deliver.
          </p>
          <p>
            Then sure I know a lot of other programming languages and frameworks, but not in the length as the previous.
            I can do stuff in Python, mostly from my Machine Learning exercises in school with Numpy, Pandas and such.
            I <b>know</b> how to code R, yet I would probably avoid coding it if I can. It's a simple language in some ways,
            utterly confusing in others. Java is something I've done but not looking forward to doing anymore. It just simply
            feels a thing of a past to me, and I would much rather use some other programming language like Go or Rust.
          </p>
          <p>
            AWS is my go-to cloud provider which I'm familiar with through work mostly. I am Cloud Architect Associate certified
            if that means anything, probably not much.
          </p>
          <h2>Other activities</h2>
          <p>
            I am an enthusiastic gym-goer and get my thrills from lifting more and with a better technique. It's been growing on
            me for a long time, maybe 3-4 years to this point when it feels <i>natural</i> to me to go the gym. There's no
            "oh I have to go the gym" but "when I can go the gym?". Hard to explain.
          </p>
          <p>
            I've done some creative activity in the past and the present, such as learning to play guitar and ukulele with some
            singing involved. As much of a creative outlet as gym is physical to me, it helps me to express ideas and feelings
            it's impossible to otherwise do.
          </p>
          <p>
            So if gym and music is so fun, why am I doing programming then? Well what first pulled me to this field was the
            ability to do my own stuff. Might sound weird, but I really like making my own things. Is it some neurological fault,
            I don't know. The art of crafting with my own hands using my accumulated knowledge just feels very appealing to me.
            Also it's very structured field and without logical deduction you simply can't make things work. I am also a
            knowledge hoarder and can browse Wikipedia for hours without getting bored.
          </p>
          <h2>Conclusion</h2>
          <p>
            All in all I try to be a happy and positive person, and sharing stuff that I've learned I find very interesting.
            For example you can find the source code for this site, that I built with Gatsby + TypeScript + AWS in GitHub.
            And if you're interested in learning more, add your comments and share your thoughts with me. This way I know if
            there's somebody reading this stuff, or am I just speaking to myself. Which is actually most of what I am doing
            here, since I am writing these articles just so I can remember how to do this stuff later on :).
          </p>
          <p>
            If you have something to ask, don't be shy to contact me through whatever way fits you best.
          </p>
          <div>
            <h2>My most recent blog posts</h2>
            <ul>
              { allMarkdownRemark.edges.map(({ node }: INode) =>
              <li key={node.frontmatter.title}><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
              )}
            </ul>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export const query = graphql`
  query FrontPageQuery {
    site {
      ...SiteData
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
`
