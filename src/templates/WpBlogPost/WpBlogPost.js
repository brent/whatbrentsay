import React from "react"
import { graphql } from "gatsby"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/@wordpress/block-library/build-style/style.css"
// import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PostWrapper from "../../components/PostWrapper";

import { zettleDate } from "../../utils";

const WpBlogPost = ({ data: { previous, next, post } }) => {
  [previous, next].forEach((post) => {
    if (post) {
      post.uri = post.uri.replace(/index\.php\//, '');
    }
  });

  const pageTitle = post.title ? post.title : zettleDate(post.date);

  return (
    <Layout>
      <Seo title={pageTitle} description={post.excerpt} />
      <PostWrapper post={post} />
    </Layout>
  )
}

export default WpBlogPost

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
