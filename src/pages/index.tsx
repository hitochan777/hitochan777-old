import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import ArticleListItem from '../components/ArticleListItem'

const StyledArticleListItem = styled(ArticleListItem)`
  margin-bottom: 20px;
`

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(edge => (
      <StyledArticleListItem
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        path={edge.node.fields.slug}
      />
    ))}
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { published: { eq: true } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          rawMarkdownBody
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
