import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout/layout.js"
import SEO from "../components/seo/seo.js"
import PostsList from '../components/PostsList/PostsList.js'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="whatbrentsay" />
      <PostsList posts={ posts } />
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            slug
            tags
          }
        }
      }
    }
  }
`
