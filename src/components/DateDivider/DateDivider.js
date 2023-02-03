import * as React from 'react';
import * as styles from './DateDivider.module.css';

const isThisYear = (date) => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const dateYear = date.getFullYear();

  if ((thisYear - dateYear) === 0) {
    return true;
  }

  if ((thisYear - dateYear) > 0) {
    return false;
  }
}

const DateDivider = ({ date }) => {
  const dateObj = new Date(date);
  const locale = 'en-US';
  const month = dateObj.toLocaleString(locale, { month: 'short' });
  const weekday = dateObj.toLocaleString(locale, { weekday: 'long' });
  const day = dateObj.toLocaleString(locale, { day: 'numeric' });
  const year = dateObj.toLocaleString(locale, { year: 'numeric' });

  return (
    <>
    <p className={ styles.dateDivider }>
      <span className={ styles.dateDivider__weekday }>{weekday},</span> <span>{ month }</span> <span>{ day }</span>{ !isThisYear(dateObj) ? <span>, { year }</span> : null }
    </p>
    </>
  )
}

export default DateDivider;
