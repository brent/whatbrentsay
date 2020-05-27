import React from "react"
import { graphql } from "gatsby"

import Layout from '../../components/layout/layout.js'
import SEO from '../../components/seo/seo.js'

import PostsListItem from '../../components/PostsListItem/PostsListItem.js';

import styles from './post.module.css';

import {
  getTemplateTag,
  stripTemplateTagFromTags,
} from '../../utils/templateParser';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const post = { node: { excerpt: '', id: 0, frontmatter: frontmatter } };

  const template = getTemplateTag(frontmatter.tags);
  frontmatter.tags = stripTemplateTagFromTags(template, frontmatter.tags);

  let PostComponent;

  switch (template) {
    case 'TIMELINE':
      PostComponent = MD_Timeline;
      break;
    default:
      PostComponent = MD_Default;
  }

  // fake the object PostsListItem requires to do its thing
  return (
    <Layout>
      <SEO title={ frontmatter.title } />
      <div className={ styles.postWrapper }>
        <PostComponent post={ post } html={ html } />
      </div>
    </Layout>
  )
}

const MD_Default = ({ post, html }) => (
  <>
    <PostsListItem {...post} />
    <div
      className={ styles.postWrapperInner }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </>
)

const MD_Timeline = ({ post, html }) => (
  <>
    <PostsListItem {...post} />
    <div
      className={ `${styles.postWrapperInner} ${styles.postWrapperInnerTimeline}` }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </>
)

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        slug
        title
        tags
      }
    }
  }
`
