import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import DateDivider from "../../components/DateDivider";
import PostListItem from "../../components/PostListItem";
import FilterButtons from '../../components/FilterButtons'

import { POST_TYPE, getPostType } from '../../utils/postType.js'

import * as styles from './BlogPostArchive.module.css';

const BlogPostArchive = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const [filters, setFilters] = useState([
    POST_TYPE.FEATURE,
    POST_TYPE.LONG,
    POST_TYPE.SHORT,
  ])

  const allPosts = data.allWpPost.nodes;

  const getFeaturePosts = (posts) => {
    let featurePosts = []

    posts.forEach(post => {
      if (POST_TYPE.FEATURE === getPostType(post)) featurePosts.push(post)
    })

    return featurePosts
  }

  const featurePosts = getFeaturePosts(allPosts)
  const [mostRecentPost, ...remainingPosts] = allPosts

  const filterPosts = (posts, filters) => {
    let filtered = []

    posts.forEach(post => {
      filters.forEach(filter => {
        if (post.categories.nodes[0].name === filter) {
          filtered.push(post)
        }
      })
    })

    return filtered
  }

  const renderPosts = (posts) => {
    return posts.map((post, index, arr) => {
      return (
        <li className={styles.postListItems} key={index}>
          <DateDivider date={post.date} />
          <PostListItem post={post} />
        </li>
      )
    })
  }

  const getFilteredPostsHeading = (filters) => {
    const HEADINGS = {
      EVERYTHING: {
        label: 'Everything Else',
        filters: [POST_TYPE.FEATURE, POST_TYPE.LONG, POST_TYPE.SHORT],
      },
      FEATURE_LONG: {
        label: 'Quality Over Quantity',
        filters: [POST_TYPE.FEATURE, POST_TYPE.LONG],
      },
      FEATURE_SHORT: {
        label: 'The Extremes',
        filters: [POST_TYPE.FEATURE, POST_TYPE.SHORT],
      },
      LONG_SHORT: {
        label: 'Nothing Fancy',
        filters: [POST_TYPE.LONG, POST_TYPE.SHORT],
      },
      FEATURE_ONLY: {
        label: 'Handcrafted, Just For You',
        filters: [POST_TYPE.FEATURE],
      },
      LONG_ONLY: {
        label: 'Articles',
        filters: [POST_TYPE.LONG],
      },
      SHORT_ONLY: {
        label: 'Unfilterd Thoughts',
        filters: [POST_TYPE.SHORT],
      }
    }

    const arraysMatch = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      const sorted1 = [...arr1].sort();
      const sorted2 = [...arr2].sort();
      return sorted1.every((item, index) => item === sorted2[index]);
    };

    for (const [key, heading] of Object.entries(HEADINGS)) {
      if (arraysMatch(filters, heading.filters)) {
        return { key, ...heading };
      }
    }

    return { label: 'What did you expect?' };
  }

  return (
    <Layout isHomePage>
      <Seo title="All posts" />

      <div className={styles.mostRecentPostWrapper}>
        <h2 className={styles.postsSectionHeading}>Latest</h2>
        <DateDivider date={mostRecentPost.date} />
        <PostListItem post={mostRecentPost} />
      </div>

      <span className={styles.postSectionDivider}></span>

      <div className={styles.featurePostsWrapper}>
        <h2 className={styles.postsSectionHeading}>All Features</h2>
        <ol className={styles.featurePosts}>
          {renderPosts(featurePosts)}
        </ol>
      </div>

      <span className={styles.postSectionDivider}></span>

      <div className={styles.postsListWrapper}>
        <h2 className={styles.postsSectionHeading}>
          {getFilteredPostsHeading(filters).label}
        </h2>
        <FilterButtons
          postTypes={[POST_TYPE.FEATURE, POST_TYPE.LONG, POST_TYPE.SHORT]}
          filters={filters}
          updateFilters={setFilters}
        />
        <ol className={styles.postsList}>
          {filterPosts(remainingPosts, filters).length > 0 ? (
            renderPosts(filterPosts(remainingPosts, filters))
          ) : (
            <p>...nothing</p>
          )}
        </ol>
      </div>
    </Layout>
  )
}

export default BlogPostArchive

export const pageQuery = graphql`
  query WordPressPostArchive {
    allWpPost(
      sort: { date: DESC },
    ) {
      nodes {
        id
        excerpt
        uri
        date
        title
        content
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            gatsbyImage(width: 616, placeholder: DOMINANT_COLOR)
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`
