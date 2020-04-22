import React from 'react';
import styles from './PostsListItem.module.css';
import { Link } from 'gatsby';

import Tag from '../Tag/Tag.js';

const renderTags = (tagsArray) => {
  return tagsArray.map((tag, index) => <Tag key={ index }>{ tag }</Tag>);
}

const formatDate = (dateString) => {
  let [ year, month, day ] = dateString.split('/');

  month = parseInt(month, 10);
  day = parseInt(day, 10);

  return `${month}/${day}`;
}

const PostsListItem = (post) => {
  const { excerpt, id, frontmatter } = post.node;

  return (
    <li className={ `${styles.postsListItem}` }>
      <p className={ styles.postsListItem__date }>{ formatDate(frontmatter.date) }</p>
      <div className={ styles.postsListItem__titleWrapper }>
        <h2 className={ styles.postsListItem__title }>
          <Link to={ `${frontmatter.date}/${frontmatter.slug}` }>{ frontmatter.title }</Link>
        </h2>
        <ul className={ styles.postsListItem__tagsList }>
          { renderTags(frontmatter.tags) }
        </ul>
      </div>
    </li>
  );
}

export default PostsListItem;
