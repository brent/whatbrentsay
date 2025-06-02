/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `whatbrentsay`,
    author: `brent meyer`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": process.env.WPGRAPHQL_URL || "http://localhost:8888/graphql"
    }
  },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `whatbrentsay`,
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
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [
        `Noto Sans\:400,400i,700`,
        `Source Serif 4\:400,700`,
      ],
      display: `swap`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};
