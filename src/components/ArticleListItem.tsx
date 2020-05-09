import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import D8 from './atom/Date'

const StyledArticle = styled.article`
  padding: 10px;
  border-radius: 10px;
  background-color: white;
`

export default ({ title, date, path, className }) => (
  <StyledArticle className={className}>
    <Link to={path}>
      <div>
        <small>
          <D8>{date}</D8>
        </small>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
    </Link>
  </StyledArticle>
)
