module.exports = {
  siteMetadata: {
    title: 'TeemuKoivisto',
    tagline: 'Awesome Gatsby site'
  },  
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-pages',
        path: `${__dirname}/blog`
      }
    }
  ],
}