import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import DateDivider from "../../components/DateDivider";
import PostListItem from "../../components/PostListItem";
import BlogPostArchivePagination from "../../components/BlogPostArchivePagination";

import * as styles from './BlogPostArchive.module.css';

const BlogPostArchive = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes;

  const renderPosts = (posts) => {
    const postsInSections = groupPostsByDate(posts);

    return postsInSections.map((section, index, arr) => (
      <li key={index} className={styles.postSection}>
        <DateDivider date={section.date.valueOf()} />
        <ol>
          {renderPostListItems(section.posts)}
        </ol>
      </li>
    ))
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

  const renderPostListItems = (posts) => {
    const displayDivider = (index, posts) => {
      if (posts.length - index > 1) {
        return (
          <span className={styles.postSectionDivider}>&#8213;</span>
        )
      }
    }

    return posts.map((post, index, arr) => {
      return (
        <li key={index}>
          <PostListItem
            post={post}
          />
          {displayDivider(index, arr)}
        </li>
      )
    })
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

      <ol className={styles.postsList}>
        {renderPosts(posts)}
      </ol>

      <BlogPostArchivePagination
        previousPagePath={previousPagePath}
        nextPagePath={nextPagePath}
      />
    </Layout>
  )
}

export default BlogPostArchive

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { date: DESC },
      limit: $postsPerPage
      skip: $offset
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
