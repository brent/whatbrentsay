import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import * as styles from './PostListItem.module.css';

import PostTimestamp from '../PostTimestamp';

import { POST_TYPE, getPostType } from '../../utils/postType';

const PostListItem = ({ post }) => {
  post.uri = post.uri.replace(/index\.php\//, '');

  const thumb = post.featuredImage != null
    ? getImage(post.featuredImage.node)
    : null

  const postType = getPostType(post);

  const PostItem = ((postType) => {
    switch(postType) {
      case POST_TYPE.SHORT:
        return (
          <ShortPostItem
            uri={post.uri}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
          />
        )
      case POST_TYPE.LONG:
        return (
          <LongformPostItem
            uri={post.uri}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            thumb={thumb}
          />
        )
      case POST_TYPE.FEATURE:
        return (
          <FeaturePostItem
            uri={post.uri}
            title={post.title}
            date={post.date}
          />
        )
      default:
        return null;
    }
  })(postType);

  const postListItemTypeClass = ((postType) => {
    switch (postType) {
      case POST_TYPE.SHORT:
        return styles.postListItem__short;
      case POST_TYPE.LONG:
        return styles.postListItem__long;
      case POST_TYPE.FEATURE:
        return styles.postListItem__feature;
      default:
        return null;
    }
  })(postType);

  return (
    <div className={`${styles.postListItem} ${postListItemTypeClass}`}>
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
      <Link to={uri}>
        <h2 className={styles.postListItem__title}>
            <span>{title}</span>
        </h2>
        <div>
          {parse(excerpt)}
        </div>
      </Link>
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
    <Link to={uri}>
      <h2 className={styles.postListItem__bigTitle}>
          {title}
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
    </Link>
  </>
)

const FeaturePostItem = ({
  uri,
  title,
  date,
}) => {
  <>
    <Link to={uri}>
      <h2 className={styles.postListItem__title}>
          {title}
      </h2>
    </Link>
  </>
}

export default PostListItem;
