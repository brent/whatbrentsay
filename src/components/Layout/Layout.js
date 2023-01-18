/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./global.css"
import * as styles from "./Layout.module.css";

import Header from "../Header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={styles.layoutWrapper}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className={styles.mainWrapper}>{children}</main>
      <footer className={styles.footerWrapper}>
        {data.site.siteMetadata?.title} © {new Date().getFullYear()} | words by <a href="https://whatbrentdo.com">brent</a>
      </footer>
    </div>
  )
}

export default Layout;
