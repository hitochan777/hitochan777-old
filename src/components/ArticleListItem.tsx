import React from 'react'

import { Link } from 'gatsby'

export default ({ title, date, path, excerpt }) => (
  <article>
    <h3>
      <Link to={path}>{title}</Link>
    </h3>
    <p>{excerpt}</p>
    <small>{date}</small>
  </article>
)
