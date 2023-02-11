import * as React from 'react';
import * as styles from './PostWrapper.module.css';
import { GatsbyImage } from "gatsby-plugin-image"
import parse from 'html-react-parser';
import PostTimestamp from '../PostTimestamp';
import { POST_TYPE, getPostType } from '../../utils/postType';
import TagList from '../TagList';

const PostWrapper = ({ post }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const postType = getPostType(post);

  let postTitleStyles = `${styles.postTitle}`;
  if (postType === POST_TYPE.LONG) {
    postTitleStyles += ` ${styles.postTitle__bigTitle}`
  }

  return (
    <article className={styles.postWrapper}>
      <header className={styles.postHeader}>
        <h1 className={postTitleStyles}>{post.title}</h1>
        <PostTimestamp
          date={post.date}
          format='date'
        />
        { post.tags.nodes.length > 0
            ? <TagList postTagNodes={post.tags.nodes} />
            : null
        }

        {featuredImage?.data && (
          <GatsbyImage
            image={featuredImage.data}
            alt={featuredImage.alt}
            style={{ marginBottom: 50 }}
          />
        )}
      </header>

      {!!post.content && (
        <section
          className={styles.postContent}
          itemProp="articleBody"
        >{parse(post.content)}</section>
      )}
    </article>
  )
};

export default PostWrapper;
