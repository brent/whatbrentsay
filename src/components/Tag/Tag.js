import React from 'react';
import styles from './Tag.module.css';

const Tag = ({ children }) => (
  <li className={ styles.tag }>
    { children }
  </li>
);

export default Tag;
