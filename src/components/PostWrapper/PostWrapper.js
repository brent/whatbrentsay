import * as React from 'react';
import * as styles from './PostWrapper.module.css';

import { GatsbyImage } from "gatsby-plugin-image"

import parse from 'html-react-parser';

import PostTimestamp from '../PostTimestamp';

const PostWrapper = ({ post }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <article className={styles.postWrapper}>
      <header className={styles.postHeader}>
        <h1 className={ styles.postTitle }>{post.title}</h1>
        <PostTimestamp date={post.date} />

        {featuredImage?.data && (
          <GatsbyImage
            image={featuredImage.data}
            alt={featuredImage.alt}
            style={{ marginBottom: 50 }}
          />
        )}
      </header>

      {!!post.content && (
        <section itemProp="articleBody">{parse(post.content)}</section>
      )}
    </article>
  )
};

export default PostWrapper;
