import * as React from 'react';
import * as styles from './TagList.module.css';

const TagList = ({ postTagNodes }) => {

  const tagsArray = postTagNodes.map(tag => tag.name);
  tagsArray.sort();

  const Tag = ({ tagName }) => <li className={styles.tag}>#{tagName}</li>

  const renderTagList = tagsArray => {
    return tagsArray.map(tag => <Tag key={tag} tagName={tag} />)
  }

  return (
    <ul className={styles.tagList}>
      { renderTagList(tagsArray) }
    </ul>
  );
};

export default TagList;
