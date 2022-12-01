import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Layout from "../components/layout"
import Seo from "../components/seo"

import parse from 'html-react-parser';

const PostItem = ({
  post
}) => {
  post.uri = post.uri.replace(/index\.php\//, '');

  const thumb = post.featuredImage != null
    ? getImage(post.featuredImage.node)
    : null

  const POST_TYPES = [
    'short',
    'long',
    'feature',
  ];

  const postType = post.categories.nodes.find(category => {
    return POST_TYPES.includes(category.name)
      ? category.name
      : null
  });

  switch(postType.name) {
    case 'long':
      return (
        <LongformPostItem 
          uri={post.uri}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
          thumb={thumb}
        />
      )
    case 'short':
      return (
        <ShortPostItem
          uri={post.uri}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
        />
      )
    case 'feature':
      return (
        <FeaturePostItem
          uri={post.uri}
          title={post.title}
          date={post.date}
        />
      )
    default:
      return;
  }
}

const ShortPostItem = ({
  uri,
  title,
  date,
  excerpt,
}) => (
  <li className='postItem postItem--short'>
    <h2>
      <Link to={uri}>
        <span>{title}</span>
      </Link>
    </h2>
    <div>
      {parse(excerpt)}
      { title === null || title === ''
          ? <Link to={uri}> more &rarr;</Link>
          : null
      }
    </div>
    <p>{date}</p>
  </li>
)

const LongformPostItem = ({
  uri,
  title,
  date,
  excerpt,
  thumb,
}) => (
  <li className='postItem postItem--long'>
    <h2>
      <Link to={uri}>
        <span>{title}</span>
      </Link>
    </h2>
    { thumb !== null
        ? (
          <div className='postItem__thumbWrapper'>
            <GatsbyImage image={thumb} alt='' />
          </div>
        )
        : null
    }
    {parse(excerpt)}
    <p>{date}</p>
  </li>
)

const FeaturePostItem = ({
  uri,
  title,
  date,
}) => {
  <li className='postItem postItem--feature'>
    <h2>
      <Link to={uri}>
        <span>{title}</span>
      </Link>
    </h2>
    <p>{date}</p>
  </li>
}

const PostsSection = ({
  title,
  children,
}) => (
  <div className='postsSection'>
    <p>{title}</p>
    {children}
  </div>
)

const renderPosts = (posts) => {
  const postsInSections = groupPostsByDate(posts);

  return postsInSections.map((section, index) => (
    <div key={section.date.valueOf()} className='postSection'>
      <h2>{section.date.valueOf()}</h2>
      <ol>
        {
          section.posts.map(post => (
            <PostItem
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

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes;

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

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default BlogIndex

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
