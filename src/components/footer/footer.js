import React from 'react';
import styles from './footer.module.css';

const Footer = () => (
  <footer className={ styles.footer }>
    { `© ${ new Date().getFullYear() }, words by `  }
    <a href='https://whatbrentdo.com'>brent</a>
  </footer>
);

export default Footer;
