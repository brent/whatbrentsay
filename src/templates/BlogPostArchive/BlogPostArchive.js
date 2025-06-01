import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import DateDivider from "../../components/DateDivider";
import PostListItem from "../../components/PostListItem";
import BlogPostArchivePagination from "../../components/BlogPostArchivePagination";

import { POST_TYPE, getPostType } from '../../utils/postType.js'

import * as styles from './BlogPostArchive.module.css';

const BlogPostArchive = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes;

  const getFeaturePosts = (posts) => {
    let featurePosts = []

    posts.forEach(post => {
      if (POST_TYPE.FEATURE === getPostType(post)) featurePosts.push(post)
    })

    return featurePosts
  }

  const featurePosts = getFeaturePosts(posts)
  const mostRecentPost = posts.splice(0, 1)[0]

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

  // TODO: make this function better
  const groupPostsByDate = (posts) => {
    const isSameDay = (date1, date2) => (
      date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate()
      && date1.getYear() === date2.getYear()
    )

    const addPostToSection = (post) => {
      postSectionPosts.push(post);
    }

    const addSectionToList = () => {
      postList.push({
        date: postSectionDate,
        posts: postSectionPosts,
      });
    }

    const resetPostSection = () => {
      postSectionDate = null;
      postSectionPosts = [];
    }

    let postList = [];
    let postSectionDate = null;
    let postSectionPosts = [];

    posts.forEach((post, index) => {
      postSectionDate ||= new Date(post.date);

      if (isSameDay(new Date(post.date), postSectionDate)) {
        addPostToSection(post);
      }

      if (!isSameDay(new Date(post.date), postSectionDate)) {
        addSectionToList();
        resetPostSection();
        postSectionDate = new Date(post.date);
        addPostToSection(post);
        return;
      }
    });

    if (postSectionPosts.length > 0) {
      addSectionToList();
      resetPostSection();
    }
    return postList;
  }

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
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
        <h2 className={styles.postsSectionHeading}>Everything Else</h2>
        <ol className={styles.postsList}>
          {renderPosts(posts)}
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
