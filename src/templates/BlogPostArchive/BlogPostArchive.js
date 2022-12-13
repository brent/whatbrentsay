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

    return postsInSections.map((section, index) => (
      <div key={section.date.valueOf()} className={styles.postSection}>
        <DateDivider date={section.date.valueOf()} />
        <ol>
          {
            section.posts.map(post => (
              <PostListItem
                key={post.id}
                post={post}
              />
            ))
          }
        </ol>
      </div>
    ))
  }

  const groupPostsByDate = (posts) => {
    let groupedPosts = [];
    let postsInDay = {
      date: null,
      posts: [],
    };

    posts.forEach((post, index) => {
      if (postsInDay.posts.length < 1) {
        postsInDay.date = new Date(post.date);
        postsInDay.posts = [...postsInDay.posts, post];
        return;
      }

      const lastPostInDay = new Date(postsInDay.posts[postsInDay.posts.length - 1].date);
      const postDate = new Date(post.date);

      if (postDate.getDate() === lastPostInDay.getDate()) {
        postsInDay.posts = [...postsInDay.posts, post];
      }

      if (postDate.getDate() !== lastPostInDay.getDate()) {
        groupedPosts = [...groupedPosts, postsInDay];
        postsInDay = {};
        postsInDay.date = new Date(post.date);
        postsInDay.posts = [post];
      }

      if (posts.length - 1 === index) {
        groupedPosts = [...groupedPosts, postsInDay];
      }
    });

    return groupedPosts;
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

      <ol style={{ listStyle: `none` }}>
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
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            gatsbyImage(width: 800, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  }
`
