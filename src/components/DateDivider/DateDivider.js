import * as React from 'react';
import * as styles from './DateDivider.module.css';

const DateDivider = ({ date }) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  console.log(styles);

  return (
    <>
      <p className={ styles.dateDivider }>{ formattedDate }</p>
    </>
  )
}

export default DateDivider;
