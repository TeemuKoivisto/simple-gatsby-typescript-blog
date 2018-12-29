module.exports = {
  siteMetadata: {
    title: 'TeemuKoivisto',
    description: 'Personal blog of Teemu Koivisto, developer and datascience student from University of Helsinki',
    image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    facebookAppId: '2200410943508452',
    disqusShortname: 'teemukoivisto-xyz', // Uses dev-teemukoivisto-xyz in development
    author: {
      name: 'Teemu Koivisto',
      schemaType: 'Person'
    },
    site: {
      siteName: 'TeemuKoivisto', // This is not very necessary for a personal blog but whatever
      canonicalUrl: 'https://teemukoivisto.xyz',
    },
    organization: {
      name: 'Teemu Koivisto',
      url: 'https://teemukoivisto.xyz',
      logo: 'https://teemukoivisto.xyz/images/avatar-460.jpeg'
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-131285076-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
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