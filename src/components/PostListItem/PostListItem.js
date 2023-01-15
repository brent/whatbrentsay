import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import * as styles from './PostListItem.module.css';

import PostTimestamp from '../PostTimestamp';

const PostListItem = ({ post }) => {
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

  let PostItem;

  switch(postType.name) {
    case 'long':
      PostItem = (
        <LongformPostItem 
          uri={post.uri}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
          thumb={thumb}
        />
      )
      break;
    case 'short':
      PostItem = (
        <ShortPostItem
          uri={post.uri}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
        />
      )
      break;
    case 'feature':
      PostItem = (
        <FeaturePostItem
          uri={post.uri}
          title={post.title}
          date={post.date}
        />
      )
      break;
    default:
      PostItem = null;
  }

  return (
    <div className={styles.postListItem}>
      {PostItem}
      <PostTimestamp date={post.date} />
    </div>
  );
};

const ShortPostItem = ({
  uri,
  title,
  date,
  excerpt,
}) => {
  const ShortPostWithTitle = ({ uri, title, excerpt }) => (
    <>
      <h2 className={styles.postListItem__title}>
        <Link to={uri}>
          <span>{title}</span>
        </Link>
      </h2>
      <div>
        {parse(excerpt)}
      </div>
    </>
  );

  const ShortPostWithoutTitle = ({ uri, excerpt }) => (
    <>
      <Link to={uri}>
        {parse(excerpt)}
      </Link>
    </>
  );

  return (
    <>
      { title === null || title === ''
        ? (
          <ShortPostWithoutTitle
            uri={uri}
            excerpt={excerpt}
          />
        ) : (
          <ShortPostWithTitle
              uri={uri}
              title={title}
              excerpt={excerpt}
          />
        )
      }
    </>
  )
}

const LongformPostItem = ({
  uri,
  title,
  date,
  excerpt,
  thumb,
}) => (
  <>
    <h2 className={styles.postListItem__bigTitle}>
      <Link to={uri}>
        {title}
      </Link>
    </h2>
    { thumb !== null
        ? (
          <div className={styles.postListItem__thumbWrapper}>
            <GatsbyImage image={thumb} alt='' />
          </div>
        )
        : null
    }
    {parse(excerpt)}
  </>
)

const FeaturePostItem = ({
  uri,
  title,
  date,
}) => {
  <>
    <h2 className={styles.postListItem__title}>
      <Link to={uri}>
        {title}
      </Link>
    </h2>
  </>
}

export default PostListItem;
