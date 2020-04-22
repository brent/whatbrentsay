import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout/layout.js"
import SEO from "../components/seo/seo.js"
import PostsList from '../components/PostsList/PostsList.js'

import styles from './index.module.css'

const renderTags = (tagsList) => {
  return tagsList.map(tag => <Tag {...tag} />);
}

const Tag = (tag) => (
  <li key={ tag.id } className={ styles.tag }>
    <a href='#'>{ tag.name }</a>
  </li>
);

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
