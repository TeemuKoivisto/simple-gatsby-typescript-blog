module.exports = {
  siteMetadata: {
    url: 'https://teemukoivisto.xyz',
    title: 'TeemuKoivisto',
    tagline: 'Awesome Gatsby site',
    description: 'Personal blog of Teemu Koivisto, developer and datascience student from University of Helsinki',
    image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    facebookAppId: '1234asdf',
    disqusShortname: 'teemukoivisto-xyz' // Uses dev-teemukoivisto-xyz in development,
  },  
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/theme/typography',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-pages',
        path: `${__dirname}/blog`
      }
    }
  ],
}