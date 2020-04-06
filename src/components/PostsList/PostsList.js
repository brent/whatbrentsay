import React, { useState, useEffect } from 'react';
import styles from './PostsList.module.css';

import PostsListItem from '../PostsListItem/PostsListItem.js';

const PostsList = ({ posts }) => {
  return (
    <ol className={ styles.postsList }>
      { posts.map(post =>  <PostsListItem key={ post.id } { ...post } />) }
    </ol>
  );
};

export default PostsList;
