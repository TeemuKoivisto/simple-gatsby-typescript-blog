module.exports = {
  siteMetadata: {
    title: 'TeemuKoivisto',
    description: 'Personal blog of Teemu Koivisto, developer and datascience student from University of Helsinki',
    image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    facebookAppId: '2200410943508452',
    disqusShortname: 'teemukoivisto-xyz', // Uses dev-teemukoivisto-xyz in development
    author: {
      name: 'Teemu Koivisto',
      image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    },
    siteUrl: 'https://teemukoivisto.xyz', // Required by gatsby-plugin-sitemap
    site: {
      siteName: 'TeemuKoivisto', // This is not very necessary for a personal blog but whatever
      canonicalUrl: 'https://teemukoivisto.xyz',
    },
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    // 'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-146681530-1",
        ],
        pluginConfig: {
          respectDNT: true,
          exclude: [],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/theme/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-katex`,
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
              showCaptions: true
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