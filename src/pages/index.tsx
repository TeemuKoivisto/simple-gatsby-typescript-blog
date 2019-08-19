import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '../theme/styled'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

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
        <Container>
          <h1>Hi there!</h1>
          <p>You have just stumbled upon my curious blog.</p>

          <p>
            Isn't it some sort of initiation for becoming a web developer that you have to at one point
            create your own website or blog? After that you can happily forget about it for all eternity and
            bumb the copyright year every decade. We'll see. :)
          </p>

          <p>
            A n y w a y, my utmost motivation was to do this because I <i>can</i>. And I guess I enjoy this,
            at some level. Nice to have something of your own.
          </p>

          <p>
            And <b>you</b> are also in luck because if you're interested in copy pasting this site for your client
            and changing couple colors here and there, all the source code is in
            <PaddedLink href="https://github.com/TeemuKoivisto/simple-gatsby-typescript-blog">
              <b>Github and freely available!</b>
            </PaddedLink>
            Only the blog writings I do not wish to be copied, I think stealing creative content and claiming it as your own
            is the sign of true human degenerate 🐌.
          </p>

          <h2>Little about me</h2>
          <p>
            Well, once upon a time, in a town far, far away...
          </p>

          <p>
            As my spawning capsule broke I scurried to escape the laboratory in which I had been kept for secret military
            experiments. My little feet skittering on the floor I went for the ventilation system but the doctors saw me
            and quickly raised alarm. While being carried away for dissection I feigned unconsciousness and when their
            focus was momentarily directed away, I bit off the fingers of one of my carriers. Exhilarated from the taste of
            blood I proceeded to massacre rest of the personnel while growing stronger. Eventually they sent exterminators
            after me and knowing that my time was up, I burrowed inside one of the corpses and took over my dead host.
            Disguising myself as a wounded survivor I did escape, and hatched a devious plan to one day take over the world
            rule my evil empire with
          </p>
          <p>
            So I was born in Raisio, or Turku if you want the specific location of my spawning place. In a test tube I absorbed
            nutrients until my masters thought I was ready. And as I popped out of the test tube I was thrown in acid,
            but alas they could not kill so I took human form to disguise
            me and from that day on I have been waiting for a perfect moment to reign my evil empire on this world.
          </p>

          <p>
            That said, I have lived most of my life in a city called Hyvinkää and umm yea. I moved to study in Helsinki and currently
            am doing my master's degree in data science, having finished my bachelor's degree in computer science.
          </p>

          <p>
            I am working part-time as a web developer, as you can see it from my LinkedIn profile. I know my way around Javascript
            stuff, Node.js and React mostly but I am transitioning completely to TypeScript whenever possible. It's just better language
            in general and I'm bit sad to admit, as I like Javascript, that as a language it has too much old baggage for it to become
            a decent language. In my mind it would be better to start off anew, like TypeScript which I find nicely to share versatility of
            JS with the strictness of typed language, whenever required. Anyway, it would be a blog post on its own to write about that.
          </p>

          <p>
            Other languages and stuff I do is Python, which I have some opinions about too. Fun language, but can result in terrible
            spagetti code. Yes, you can do that in any language but I find it uncommonly easy to do in Python. And with Python I do
            machine learning and statistics stuff. Umm, yea. I'm more of a web developer to be honest and making funny web pages or apps
            is I think fun. Data science is to me a bit too abstract and difficult at times, maybe because I'm myself a bit too much of a
            brick-head and dummy at times. But whoever has studied data science and can relate to ordinary people, it's <b>really</b> hard
            for most of us.
          </p>

          <p>
            The biggest thing or revelation I actually have learned from studying DS is to study hard. Yes, I was one of
            those kids. Not as bad as many others I knew but I really didn't put the effort required to learn math (and other subjects too)
            in high school. It was
            funny actually, that I got on a scale from 10-4 (4 means failed) 10 10 9 10 from my first 4 math courses in high school.
            (I should probably mention that there's two tracks to study math in Finnish high school, short and long of which I took
            the long).
            The first 4 were basically rehersal of old stuff but in the 5th course we had vectors which were totally new thing and without
            knowing how to properly study I got 6 from that. And from there on my grades were between 5-7. So yeah, enjoyed a lot more
            video games than studying back then.
          </p>
          <p>
            Nowadays I don't actually even play games anymore, only on random chance. Games are a
            good way to empty your brain but that hedonistic loop is too easy to overdo and in the end, there's not much you learn in
            games that actually benefits you. I'd much rather now make music, go to the gym or watch Youtube (yes, that's my only major
            weakness anymore =)). But to be frank from watching Youtube I have actually learned a ton of new things and gotten life-changing
            influences. Like cooking videos, those are like crack to me right now (26.2.2019). Ah yeah, cook the souffle. Powder that bitch,
            sprinkle that cocoa. (kuva Randy marshista)
          </p>

          <p>
            Huh, sorry that I started accidentally ranting but you probably can notice that I enjoy writing too quite a lot. Since I was
            little I think I was quite inventive with words but without the proper environment I guess, I did never become a writer. Which
            might be a good thing too, I mean programming is a lot easier than creative writing. You have a clear task what to do, and
            no massive ambiguity in doing that. Just. Make. Shit. Happen. And write good code et cetera but I mean that goes without saying.
            Duh.
          </p>

          <h2>Conclusion</h2>
          <p>
            So to conclude this rambling; I like coding stuff. I coded this. Also I like writing. I can now write here. Thanks for visiting.
            Bye.
          </p>
          <div>
            <h2>My 5 most recent blog posts</h2>
            <ul>
              { allMarkdownRemark.edges.slice(0, 5).map(({ node }: INode) =>
              <li key={node.frontmatter.title}><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
              )}
            </ul>
          </div>
        </Container>
      </DefaultLayout>
    )
  }
}
const Container = styled.div`
  margin-bottom: 40px;
`
const PaddedLink = styled(OutboundLink)`
  margin: 0 5px 0 5px;
`

export const query = graphql`
  query FrontPageQuery {
    site {
      ...SiteData
    }
    allMarkdownRemark(sort: { fields: [frontmatter___datePublished], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
`
