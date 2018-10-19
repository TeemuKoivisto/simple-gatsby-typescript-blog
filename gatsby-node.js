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
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const nodes = result.data.allMarkdownRemark.edges.map(({ node }) => node)
  nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/BlogPost.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  console.log(JSON.stringify(result, null, 4))
}
