const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Select only markdown-nodes picked up by 'gatsby-transformer-remark'
  if (node.internal.type === `MarkdownRemark`) {
    // Generate a slug name from the file name
    const slug = createFilePath({ node, getNode, basePath: `blog` })
    // This will add a 'slug'-field to the file-node's 'fields' -object
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const nodes = result.data.allMarkdownRemark.edges.map(({ node }) => node)
  nodes.forEach((node, i) => {
    const previousNode = i !== nodes.length - 1 ? nodes[i+1] : undefined
    const nextNode = i !== 0 ? nodes[i-1]: undefined
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/BlogPost.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        // Add previous and next pages for easy pagination of blog posts
        previous: {
          slug: previousNode && previousNode.fields.slug,
          title: previousNode && previousNode.frontmatter.title,
          date: previousNode && previousNode.frontmatter.date,
        },
        next: {
          slug: nextNode && nextNode.fields.slug,
          title: nextNode && nextNode.frontmatter.title,
          date: nextNode && nextNode.frontmatter.date,
        }
      },
    })
  })
}
