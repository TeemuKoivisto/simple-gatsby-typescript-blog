import React from "react"

interface ISEOGeneralProps {
  description: string
  image: string
  JSONLD: object
}

export const SEOGeneral: React.SFC<ISEOGeneralProps> = ({ description, image, JSONLD }) : any => ([
  // General tags
  <meta key="description" name="description" content={description} />,
  <meta key="image" name="image" content={image} />,

  // Schema.org tags
  <script key="application/ld+json" type="application/ld+json">
    {JSON.stringify(JSONLD)}
  </script>
])

interface ISEOFacebookProps {
  url: string
  title: string
  description: string
  image: string
  facebookAppId: string
}

export const SEOFacebook: React.SFC<ISEOFacebookProps> = ({ url, title, description, image, facebookAppId}) : any => [
  <meta key="og:url" property="og:url" content={url} />,
  <meta key="og:type"  property="og:type" content="article" />,
  <meta key="og:title" property="og:title" content={title} />,
  <meta key="og:description" property="og:description" content={description} />,
  <meta key="og:image" property="og:image" content={image} />,
  <meta key="fb:app_id" property="fb:app_id" content={facebookAppId}/>
]

interface ISEOTwitterProps {
  title: string
  description: string
  image: string
}

export const SEOTwitter = ({ title, description, image }) :any => [
  <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
  // <meta name="twitter:creator" content={twitterUser} />,
  <meta key="twitter:title" name="twitter:title" content={title} />,
  <meta key="twitter:description" name="twitter:description" content={description} />,
  <meta key="twitter:image" name="twitter:image" content={image} />
]
