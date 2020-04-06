import React from 'react';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <div className={ styles.appHeader }>
      <h1 className={ styles.logo }>whatbrentsay</h1>
    </div>
  )
}

export default AppHeader;
