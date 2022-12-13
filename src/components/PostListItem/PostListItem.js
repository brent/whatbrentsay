import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import * as styles from './PostListItem.module.css';

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
};

export default PostListItem;

const ShortPostItem = ({
  uri,
  title,
  date,
  excerpt,
}) => (
  <li className={styles.postListItem}>
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
  <li className={styles.postListItem}>
    <h2>
      <Link to={uri}>
        <span className={styles.postListItem__bigTitle}>{title}</span>
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
  <li className={styles.postListItem}>
    <h2>
      <Link to={uri}>
        <span>{title}</span>
      </Link>
    </h2>
    <p>{date}</p>
  </li>
}
