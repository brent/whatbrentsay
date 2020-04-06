import React from 'react';
import styles from './PostsListItem.module.css';
import { Link } from 'gatsby';

import Tag from '../Tag/Tag.js';

const renderTags = (tagsArray) => {
  return tagsArray.map((tag, index) => <Tag key={ index }>{ tag }</Tag>);
}

const PostsListItem = (post) => {
  const { excerpt, id, frontmatter } = post.node;

  return (
    <li className={ `${styles.postsListItem}` }>
      <p className={ styles.postsListItem__date }>{ frontmatter.date }</p>
      <div className={ styles.postsListItem__titleWrapper }>
        <h2 className={ styles.postsListItem__title }>
          <Link to={ frontmatter.path }>{ frontmatter.title }</Link>
        </h2>
        <ul className={ styles.postsListItem__tagsList }>
          { renderTags(frontmatter.tags) }
        </ul>
      </div>
    </li>
  );
}

export default PostsListItem;
