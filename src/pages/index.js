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
    /*
    <Layout>
      <SEO title="whatbrentsay" />
      <div className="blog-posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div className={ styles.postListItem } key={post.id}>
                <h1 className={ styles.postListItem__titleWrapper }>
                  <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                </h1>
                <h2 className={ styles.postListItem__date }>{post.frontmatter.date}</h2>
                <p>{post.excerpt}</p>
                <ul>{ post.frontmatter.tags }</ul>
              </div>
            )
          })}
      </div>
    </Layout>
    */
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
            date(formatString: "M/D")
            path
            tags
          }
        }
      }
    }
  }
`
