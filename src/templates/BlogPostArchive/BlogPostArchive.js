import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import DateDivider from "../../components/DateDivider";
import PostListItem from "../../components/PostListItem";
import FilterButtons from '../../components/FilterButtons'

import { POST_TYPE, getPostType } from '../../utils/postType.js'

import * as styles from './BlogPostArchive.module.css';

// Mapping between query param labels and internal POST_TYPE values
const LABEL_TO_TYPE = {
  'features': POST_TYPE.FEATURE,
  'articles': POST_TYPE.LONG,
  'bits': POST_TYPE.SHORT,
}

const TYPE_TO_LABEL = {
  [POST_TYPE.FEATURE]: 'features',
  [POST_TYPE.LONG]: 'articles',
  [POST_TYPE.SHORT]: 'bits',
}

// Parse query params to filter array
const parseQueryParams = () => {
  if (typeof window === 'undefined') return null

  const params = new URLSearchParams(window.location.search)
  const postsParam = params.get('posts')

  if (!postsParam) return null
  if (postsParam === 'none') return []

  const labels = postsParam.split('+')
  return labels.map(label => LABEL_TO_TYPE[label]).filter(Boolean)
}

// Convert filter array to query param string
const filtersToQueryString = (filters) => {
  // No filters selected = 'none' state
  if (filters.length === 0) return 'none'

  // All three filters selected = no query param needed
  const allFilters = [POST_TYPE.FEATURE, POST_TYPE.LONG, POST_TYPE.SHORT]
  const hasAllFilters = allFilters.every(type => filters.includes(type))
  if (hasAllFilters && filters.length === 3) return ''

  const labels = filters.map(filter => TYPE_TO_LABEL[filter]).filter(Boolean)
  return labels.join('+')
}

const BlogPostArchive = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  // Initialize filters from query params or default to all
  const [filters, setFilters] = useState(() => {
    const paramsFilters = parseQueryParams()
    return paramsFilters || [
      POST_TYPE.FEATURE,
      POST_TYPE.LONG,
      POST_TYPE.SHORT,
    ]
  })

  // Sync URL when filters change
  useEffect(() => {
    const queryString = filtersToQueryString(filters)
    // Empty string means all filters (no query param)
    // 'none' means no filters (?posts=none)
    // Otherwise use the specific filter combination
    const newUrl = queryString === '' ? '/' : `/?posts=${queryString}`

    // Only update URL if it actually changed
    if (typeof window !== 'undefined') {
      const currentParams = new URLSearchParams(window.location.search)
      const currentPostsParam = currentParams.get('posts')
      const newPostsParam = queryString === '' ? null : queryString

      if (currentPostsParam !== newPostsParam) {
        window.history.replaceState({}, '', newUrl)
      }
    }
  }, [filters])

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
        <li className={styles.postListItem} key={index}>
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
        label: 'Structured Thoughts',
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

      <div className={styles.postsWrapper}>
        <div className={styles.mostRecentPostWrapper}>
          <h2 className={styles.postsSectionHeading}>Latest</h2>
          <DateDivider date={mostRecentPost.date} />
          <PostListItem post={mostRecentPost} />

          <span className={styles.postSectionDivider}></span>
        </div>

        <div className={styles.featurePostsWrapper}>
          <h2 className={styles.postsSectionHeading}>All Features</h2>
          <ol className={styles.featurePosts}>
            {renderPosts(featurePosts)}
          </ol>

          <span className={styles.postSectionDivider}></span>
        </div>

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
