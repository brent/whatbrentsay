import * as React from 'react';
import * as styles from './PostTimestamp.module.css';

const PostTimestamp = ({ date, format='time' }) => {
  const dateObj = new Date(date);

  const getTimestamp = date => {
    const locale = 'en-US';
    const time = date.toLocaleTimeString(locale, {
      timeStyle: 'short',
    });

    return time.split(' ').join('');
  }

  const getDateStamp = date => {
    const locale = 'en-US';
    const month = dateObj.toLocaleString(locale, { month: 'short' });
    const day = dateObj.toLocaleString(locale, { day: 'numeric' });
    const year = dateObj.toLocaleString(locale, { year: 'numeric' });

    const timestamp = getTimestamp(date);

    return `${month} ${day}, ${year} ${timestamp}`;
  }

  let displayTime;

  switch (format) {
    case 'time':
      displayTime = getTimestamp(dateObj);
      break;
    case 'date':
      displayTime = getDateStamp(dateObj);
      break;
    default:
      displayTime = '???';
  }

  return <p className={styles.postTimestamp}>{displayTime}</p>;
};

export default PostTimestamp;
