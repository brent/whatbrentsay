import * as React from 'react';
import { Link } from 'gatsby';
import * as styles from './BlogPostArchivePagination.module.css';

const BlogPostArchivePagination = ({
  previousPagePath,
  nextPagePath,
}) => (
  <div className={styles.BlogPostArchivePagination}>
    {previousPagePath && (
      <>
        <Link to={previousPagePath}>Previous page</Link>
      </>
    )}
    {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
  </div>
);

export default BlogPostArchivePagination;

