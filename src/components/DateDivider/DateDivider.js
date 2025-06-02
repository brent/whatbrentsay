import * as React from 'react';
import * as styles from './DateDivider.module.css';

import PostTimestamp from '../PostTimestamp/'

const DateDivider = ({ date }) => {
  const dateObj = new Date(date);
  const locale = 'en-US';
  const month = dateObj.toLocaleString(locale, { month: 'numeric' });
  const weekday = dateObj.toLocaleString(locale, { weekday: 'long' });
  const day = dateObj.toLocaleString(locale, { day: 'numeric' });
  const year = dateObj.toLocaleString(locale, { year: 'numeric' });

  return (
    <>
      <p className={styles.dateDivider}>
        <span className={styles.dateDivider__weekday}>{weekday}</span>
        ,&nbsp;
        <span className={styles.dateDivider__month}>{month}</span>/<span className={styles.dateDivider__day}>{day}</span><span className={styles.dateDivider__year}>/{year}</span>
        &nbsp;@&nbsp;
        <PostTimestamp date={date} />
      </p>
    </>
  )
}

export default DateDivider;
