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
            title
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

      if (!post.title) {
        // because gatsby-node doesn't support 'import'
        // this closure is a copy and paste from
        // untititledPostUri in ./src/utils
        const postUri = ((postDate) => {
          const padNum = (num) => `0${num}`;

          const postDateObj = new Date(postDate);

          const year = postDateObj.getFullYear();

          const month = (() => {
            let month = postDateObj.getMonth() + 1; // zero-indexed
            return month < 10 ? padNum(month) : month;
          })();

          const day = (() => {
            let day = postDateObj.getDate();
            return day < 10 ? padNum(day) : day;
          })();

          const hour = (() => {
            let hour = postDateObj.getHours();
            return hour < 10 ? padNum(hour) : hour;
          })();

          const min = (() => {
            let min = postDateObj.getMinutes();
            return min < 10 ? padNum(min) : min
          })()

          return `/${year}/${month}/${day}/${hour}${min}/`;
        })(post.date);

        post.uri = postUri;
      }

      createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/WpBlogPost/WpBlogPost.js`),
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
        component: path.resolve(`./src/templates/BlogPostArchive/BlogPostArchive.js`),
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
