/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`src/templates/post/post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              slug
              date(formatString: "YYYY/MM/DD")
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // const postRelPath = node.fileAbsolutePath.split('posts/')[1];
    // const [ year, month, day, slug, file ] = postRelPath.split('/');

    createPage({
      // path: `/${year}/${month}/${day}/${slug}`,
      path: `${node.frontmatter.date}/${node.frontmatter.slug}`,
      component: postTemplate,
      context: { slug: node.frontmatter.slug }, // additional data can be passed via context
    })
  })
}
