/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `whatbrentsay`,
    description: ``,
    author: `brent meyer`,
    siteUrl: `https://whatbrentsay.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: 'eb11c726-36cf-4277-822b-65abd166dbf8',
        srcUrl: 'https://analytics.whatbrentdo.com/umami.js',
        includeInDevelopment: true,
        autoTrack: true,
        repsectDoNotTrack: true
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/wbs-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `http://localhost:8000/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Noto Sans\:400,400i,700`,
          `Source Serif 4\:400,700`,
        ],
        display: `swap`,
      },
    },
  ],
}
