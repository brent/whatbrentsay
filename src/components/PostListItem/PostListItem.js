import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import * as styles from './PostListItem.module.css';

import PostTimestamp from '../PostTimestamp';
import TagList from '../TagList';

import { POST_TYPE, getPostType } from '../../utils/postType';
import { untitledPostUri } from '../../utils';

const PostListItem = ({ post }) => {
  post.uri = post.uri.replace(/index\.php\//, '');

  const thumb = post.featuredImage != null
    ? getImage(post.featuredImage.node)
    : null

  const postType = getPostType(post);

  const PostItem = ((postType) => {
    switch (postType) {
      case POST_TYPE.SHORT:
        return (
          <ShortPostItem
            uri={post.title ? post.uri : untitledPostUri(post.date)}
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
            excerpt={post.excerpt}
            content={post.content}
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
      {post.tags.nodes.length > 0
        ? <TagList postTagNodes={post.tags.nodes} />
        : null
      }
      <PostTimestamp date={post.date} />
    </div>
  );
};

const formatExcerpt = (excerpt, length = 240) => {
  const excerptWithoutHEllip = excerpt.replace(' [&hellip;]', '');
  const paragraphText = excerptWithoutHEllip.split('<p>')[1].split('</p>')[0];
  const moreIndicator = '&hellip;';
  const trimmedExcerpt = paragraphText.slice(0, length);

  return excerptWithoutHEllip.split('').length > length
    ? `<p>${trimmedExcerpt.slice(0, length)}${moreIndicator}</p>`
    : `<p>${trimmedExcerpt}</p>`;
}

const ShortPostItem = ({
  uri,
  title,
  date,
  excerpt,
}) => {
  const ShortPostWithTitle = ({ uri, title, excerpt }) => (
    <>
      <Link to={uri}>
        <h3 className={styles.postListItem__title}>
          <span>{title}</span>
        </h3>
        {parse(excerpt)}
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

  const formattedExcerpt = formatExcerpt(excerpt)

  return (
    <>
      {title === null || title === ''
        ? (
          <ShortPostWithoutTitle
            uri={uri}
            excerpt={formattedExcerpt}
          />
        ) : (
          <ShortPostWithTitle
            uri={uri}
            title={title}
            excerpt={formattedExcerpt}
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
      <h3 className={`${styles.postListItem__title} ${styles.postListItem__bigTitle}`}>
        {title}
      </h3>
      {thumb !== null
        ? (
          <div className={styles.postListItem__thumbWrapper}>
            <GatsbyImage image={thumb} alt='' />
          </div>
        )
        : null
      }
      {parse(formatExcerpt(excerpt))}
    </Link>
  </>
)

const FeaturePostItem = ({
  uri,
  title,
  date,
  excerpt,
  content,
}) => {
  const regex = /<p><a href="(?<href>.*)">(?<label>.*)<\/a><\/p>/;
  const { href } = content.match(regex).groups;

  return (
    <>
      <Link to={href}>
        <h3 className={`${styles.postListItem__title} ${styles.postListItem__hugeTitle}`}>
          {title}
        </h3>
        {excerpt ? parse(excerpt) : null}
      </Link>
    </>
  )
}

export default PostListItem;
