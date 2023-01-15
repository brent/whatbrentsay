import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image';

import * as styles from './Header.module.css';

const Header = ({ siteTitle }) => (
  <header className={styles.headerWrapper}>
    <h1>
      <Link to="/">
        <StaticImage
          src='../../images/wbs-logo.png'
          placeholder='blurred'
          alt='whatbrentsay logo'
          layout='fixed'
          width={48}
          height={48}
          className={styles.logoImg}
        />
      </Link>
    </h1>
  </header>
)

export default Header
