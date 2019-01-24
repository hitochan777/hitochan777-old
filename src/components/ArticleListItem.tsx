import React from 'react'
import { Link } from 'gatsby'

import D8 from './atom/Date'

export default ({ title, date, path }) => (
  <article>
    <h3>
      <Link to={path}>{title}</Link>
    </h3>
    <small>
      <D8>{date}</D8>
    </small>
  </article>
)
