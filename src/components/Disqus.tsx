import * as React from 'react'
import ReactDisqusComments from 'react-disqus-comments'

interface IProps {
  shortname: string
  title: string
}

/**
 * Wrapper around react-disqus-comments
 * 
 * If you're familiar with Disqus, you know there's a few parameters that it
 * requires to function. However, in my case I'm happy with the defaults that
 * are used so I'm only using the minimum needed.
 * https://github.com/theplatapi/react-disqus-thread/blob/master/typescript/types.d.ts
 */
export class Disqus extends React.PureComponent<IProps> {
  render() {
    const { shortname, title } = this.props
    const modifiedShortname = process.env.NODE_ENV === 'development' ? 'dev-' + shortname : shortname
    return (
      <ReactDisqusComments
        shortname={modifiedShortname}
        title={title}
        // Uses the article title from the frontmatter as identifier.
        // This can be a bad thing were I to change the title... But well I better not do it then.
        identifier={title}
      />
    )
  }
}
