module.exports = {
  siteMetadata: {
    canonicalUrl: 'https://teemukoivisto.xyz',
    title: 'TeemuKoivisto',
    siteName: 'TeemuKoivisto', // This is not very necessary for a personal blog but whatever
    description: 'Personal blog of Teemu Koivisto, developer and datascience student from University of Helsinki',
    image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    facebookAppId: '2200410943508452',
    disqusShortname: 'teemukoivisto-xyz', // Uses dev-teemukoivisto-xyz in development
    author: {
      name: 'Teemu Koivisto',
    },
    organization: {
      name: 'Teemu Koivisto',
      url: 'https://teemukoivisto.xyz',
    }
  },  
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-katex`,
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-pages',
        path: `${__dirname}/blog`
      }
    },
  ],
}