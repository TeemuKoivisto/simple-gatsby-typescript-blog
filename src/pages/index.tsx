import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '../theme/styled'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

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
            I guess it’s some type of initiation rite for becoming a web developer that you have to create your own website… After which it can be left to dust for all eternity. We’ll see. Maybe my credit card will run out before that.
          </p>

          <p>
            So that is why and uhm. Instead of being all so formal and pedant about it, and optimize everything for the perfect SEO results, I might end up just writing random stuff here that doesn’t make sense. Because why not? It’s dull already being a software developer and constantly being told what to do. What color borders to use. What size of font to put. Maybe I should turn this into 90’s theme website. Just to make a point.
          </p>

          <p>
            And actually I even <b>open-sourced</b> this site:
            <PaddedLink href="https://github.com/TeemuKoivisto/simple-gatsby-typescript-blog">
              <b>Github link.</b>
            </PaddedLink>
          Wow. What a generous man. “People are saying that this guy is the most generous man on this planet, believe me. A lot of people are saying that”.
          </p>

          <h2>Little about me</h2>
          <p>
            Since it wouldn’t any sense to me that I would have a personal website without anything, well, personal about me, I’ll here shortly describe my life story. I might have omitted and/or exaggerated some details. It’s strange that nowadays you don’t really read about this type of stories in web pages anymore. Is it because it’s redundant in the age of social media or is it out of the fear of people stealing your personal information? But the world has become a lot less exciting place regarding the internet, that’s for sure. I remember when it used to feel so cool. Now it’s just meh. Nobody cares.
          </p>

          <p>
            I was born in Raisio or well Turku University Hospital to be specific. Temperature outside was maybe 10C, can’t really recall it that clearly. The nurse was nice who helped out into this world. I was of course a little bit upset having so my nap so abruptly interrupted. And yeah. It’s been downhill ever since. 
          </p>

          <p>
            After some time in Raisio my parents moved to Kaarina. Or so I have been told. I really don’t have a lot of memories about those <i>good old times</i>. I remember riding a bike once. I think the stakes were so high that my brain thought: “This is it, you either live or die. There’s no going back!”. Funnily enough I don’t recall falling down. But from what I have been told that happened a quite a few times.
          </p>

          <p>
            Anyway, after a while we left Kaarina too. I think I was 6. We moved into another city called Hyvinkää. A bit further away but perhaps my parents got some job offers or something, I don’t know. Still somewhat fuzzy to me. But yeah, those were the days… Don’t recall anything special about that time either. Made some friends. Played with Legos, snow. Hmm. In hindsight a bit depressing childhood as it wasn’t anything like in the movies where the children have awesome slumber parties and halloween dress-ups. Nope, nothing like that. Maybe that is why I have ended up here, reminiscing about my futile life in such dull manner. I almost feel like I grew up in the Middle-Ages now that I compare myself to the American movie ideals. Oh well.
          </p>

          <p>
            So in Hyvinkää we first lived in this one house, but moved into another one which was a shitty block-house with some drunkards as neighbours. And there lived a kid in the bottom floor or well his father who he came to visit every other weekend, who had Doom in his computer. That was quite exciting and I remember that. And I remember playing a lot of SimCity 2000, that was one of my favourite games. Yeah, a lot of playing with computers and PlayStation. A waste of my time really, now that I think about it. And too bad my parents weren’t really keen on teaching me or well putting me on hobbies that would have taught me useful skills. I bit feel like I was robbed of a lot of opportunities by my parents lethargy on this matter. Hmm. But I liked to play and read a lot of comics, Donald Duck and Tintin and such. We had a really messy room with my brother. How the hell detailed am I going to write this?? I think the frontpage isn’t supposed to be a full short story.
          </p>

          <p>
            Well anyway time went by, and boom, I was out of the high school, out of the army and thinking about what the hell I should do with my life. Due to my quite uninspiring upbringing (from which I am omitting quite a lot and am still grateful to my parents for it yadda yadda) I didn’t really have that strong inclinations for anything. I was pretty good at writing, I guess, so I wanted to try out if I could make it as a writer or something. I had this book I was writing but let’s be honest, it wasn’t really Shakespearean-level stuff. Quite tedious ramblings of 21-year old or something. Yes, it was a bit confusing time. I really wanted to do something, but what. I always enjoyed being creative and making my own things, or well writings, and then trying to aim for perfection (which never happened). I guess that type of perfectionism and somewhat loose and open attitude is a quite desirable personality in artists and whatnot. And programmers! That is what I learned one beautiful day too.
          </p>

          <p>
            Actually I remember quite clearly the moment when I decided to change my life to star studying to become a programmer. I had read this news about a kid who sold his news start-up for millions and I thought “that is dumb, anyone can do that”. So, on that spot (which was a sofa in the Metropolia library) I came up with a silly business idea which I thought was pretty good and decided later that “Why I shouldn’t try to do this?”. At the time I had grown quite weary of writing and with lack of support or proper mental models (which I have now) I didn’t really have the strength nor the willpower to reach for anything higher. Writing had become a drag and my studies were “meh” and I didn’t really feel like I was growing as a person. In short: I felt bored. Bored and intellectually unchallenged (because I didn’t have major obstacles that I felt needed conquering). It was just very dull, believe me. And I think it still is, in some sense, but I have grown so much more capable of handling that so I am quite fine with it now. 
          </p>

          <p>
            And here I am speeding up again. Long story short: I took up programming courses in Metropolia, was pretty good at them but didn’t feel the IT-engineering degree there was really up-to-par to my ambitions. So I decided to apply to study Computer Science in University of Helsinki in which I got in. And after that I felt much happier, much more satisfied with the environment. It felt a bit like home might I say. So many people alike you, people who were smarter than you (in some skills) but who weren’t that smug about it. Of course freshmans and beginners in general have quite elevated perception of themselves but it comes down at some point, believe me. If I met myself of that time now, I would probably be a bit pissed at him for being so unreasonably blunt and at times uncompromising. The biggest revelations to me as a person, student and a programmer have been the complete 180-degree turns in my opinions in some things. To have your views challenged which you are quite vocal and sure about and then understand that you are <b>wrong</b> is quite powerful. You feel so humbled that it makes you more careful in your words, more careful in your judgements. Some world leaders should take a lesson from that.
          </p>

          <p>
            So where was I? See, this has already turned into one tangled mess of a rambling. I feel like an old man writing my own memoir. “And then, and then, and then I went to the bathroom. And after that, there was a lecture. And after that lecture there …”. But yeah, I had some good times, some bad times while attending the university. Some folks in US take much shorter time than I do (1.5 years in Metropolia, 6 in University. Practically forever as a young person..). But I think that time was necessary for me to become more rounded person. There isn’t really a similar social network as in US to which to fall on (or well I feel it’s weaker) so had I just gone to some shitty job after not doing much in Metropolia and maybe writing some stories in my spare time who knows, maybe I would be a pretty decent author or just very unhappy person who feels completely trapped in general.
          </p>

          <p>
            At this very moment as of writing this way too long introduction I am currently finishing up my Data Science Master’s degree in University of Helsinki which I hope to complete during the next spring. Then my vistas are open for new opportunities and I feel content facing the ominous treadmill of 9-5-5 work.
          </p>

          <h2>Technological opinions</h2>
          <p>
            Oh yes should I also describe my programmer identity and the tools of the trade I use? This article is already so long that I guess no one will notice if I add a few words more...
          </p>

          <p>
            I am a notorious Node.js programmer, whose main frontend UI framework is React. I know some Vue too (and AngularJS to be accurate) but React is a solid, all-around tool which I know the best so I use it.
          </p>

          <p>
            I am not a big fan of JavaScript itself, but I feel it’s the lesser evil of many other, more annoying languages (Java, C++, Python). And I’m lazy and I do webdev, so why not use the same language for backend as frontend? To be honest I don’t really use JavaScript anymore if I can, but it’s much more superior brother TypeScript. It’s nice and fits into my workflow where some looseness is allowed, but is dumbed-down enough so you can’t get too smart with it. I hate when programmers get too smart. It’s when the programmers have little experience working in teams or that they just are egoistical, and think because they wrote it as a one-liner it means it’s perfect. And then they over-abstract everything just to make it look pretty and in the end creating unmaintainable garbage. Like this site. Ha ha.
          </p>

          <h2>Conclusion</h2>
          <p>
            So that was it and it was way too much, I know, but I don’t really care. Because it’s my own website so I do what I darn well please! =) No one else to please but me, ahh. Feels good to be the sole stakeholder and product owner. Just. Silence. There was bigger picture I was going for with this thing but I guess it got lost somewhere in the process.
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
  margin-bottom: 3rem;
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
