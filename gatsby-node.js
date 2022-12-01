const path = require(`path`);
const chunk = require(`lodash/chunk`);

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const wpPosts = await getWpPosts({ graphql, reporter });

  await createWpBlogPostPages({ wpPosts, createPage });
  await createWpPostArchive({ wpPosts, graphql, createPage });
}

async function getWpPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { date: DESC }) {
        edges {
          previous {
            id
          }

          post: node {
            id
            uri
            date
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Wp blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges;
}

async function createWpBlogPostPages({ wpPosts, createPage }) {
  Promise.all(
    wpPosts.map(({ previous, post, next }) => {
      post.uri = post.uri.replace(/index\.php\//, '');

      createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/wp-blog-post.js`),
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        }
      });
    })
  );
}

async function createWpPostArchive({ wpPosts, graphql, createPage }) {
  const graphqlResult = await graphql(`
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  const { postsPerPage } = graphqlResult.data.wp.readingSettings;
  const postsChunkedIntoArchivePages = chunk(wpPosts, postsPerPage);
  const totalPages = postsChunkedIntoArchivePages.length;

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (posts, index) => {
      const pageNumber = index + 1;

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          return page === 1 ? `/` : `/page/${page}`
        }

        return null;
      };

      await createPage({
        path: getPagePath(pageNumber),
        component: path.resolve(`./src/templates/blog-post-archive.js`),
        context: {
          offset: index * postsPerPage,
          postsPerPage,
          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      });
    })
  );
}
