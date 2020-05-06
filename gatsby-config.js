module.exports = {
  siteMetadata: {
    title: `whatbrentsay`,
    description: `tech, games, design, code`,
    author: `brent`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/wbs-logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
	path: `${__dirname}/posts`,
	name: `posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
	plugins: [
	  // gatsby-remark-relative-images must
	  // go before gatsby-remark-images
	  {
	    resolve: `gatsby-remark-relative-images`,
	  },
	  {
	    resolve: `gatsby-remark-images`,
	    options: {
	      // It's important to specify the maxWidth (in pixels) of
	      // the content container as this plugin uses this as the
	      // base for generating different widths of each image.
	      maxWidth: 672,
	    },
	  },
	],
      },
    },
  ],
}
