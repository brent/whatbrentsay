import * as React from 'react';
import * as styles from './PostTimestamp.module.css';

const PostTimestamp = ({ date }) => { 
  const dateObj = new Date(date);
  const locale = 'en-US';
  const time = dateObj.toLocaleTimeString(locale, {
    timeStyle: 'short',
  });

  return <p className={styles.postTimestamp}>{time.split(' ').join('')}</p>;
};

export default PostTimestamp;
