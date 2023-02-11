import * as React from 'react';
import * as styles from './TagList.module.css';
import parse from 'html-react-parser';

const Tag = (tagName) => <li className={styles.tag}>{tagName}</li>


const TagList = ({ postTagNodes }) => {
  const tagsArray = postTagNodes.map(tag => tag.name);

  const renderTagList = tagsArray => {
    return tagsArray.map(tag => parse(`<li>#${tag}</li>`));
  }

  return (
    <ul className={styles.tagList}>
      { renderTagList(tagsArray) }
    </ul>
  );
};

export default TagList;
