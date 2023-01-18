import * as React from 'react';
import { Link } from 'gatsby';
import * as styles from './BlogPostPagination.module.css';

const BlogPostPagination = ({ previous, next }) => (
  <nav className={styles.blogPostPagination}>
    <ul>
      <li>
        {previous && (
          <Link to={previous.uri} rel="prev">
            ← {previous.title}
          </Link>
        )}
      </li>

      <li>
        {next && (
          <Link to={next.uri} rel="next">
            {next.title} →
          </Link>
        )}
      </li>
    </ul>
  </nav>
);

export default BlogPostPagination;
