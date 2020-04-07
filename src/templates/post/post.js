import React from "react"
import { graphql } from "gatsby"

import Layout from '../../components/layout/layout.js'
import SEO from '../../components/seo/seo.js'

import PostsListItem from '../../components/PostsListItem/PostsListItem.js';

import styles from './post.module.css';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  // fake the object PostsListItem requires to do its thing
  const post = { node: { excerpt: '', id: 0, frontmatter: frontmatter } };
  return (
    <Layout>
      <SEO title={ frontmatter.title } />
      <div className={ styles.postWrapper }>
        <PostsListItem {...post} />
        <div
          className={ styles.postWrapperInner }
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "M/D")
        path
        title
        tags
      }
    }
  }
`
