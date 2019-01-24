import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import ArticleListItem from '../components/ArticleListItem'

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(edge => (
      <ArticleListItem
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
    allMarkdownRemark(limit: 10, sort: { fields: [fields___slug] }) {
      totalCount
      edges {
        node {
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
