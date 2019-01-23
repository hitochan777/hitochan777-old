import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout.tsx'
import ArticleListItem from '../components/ArticleListItem'

const formatDate = d => {
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  // FIXME: the logic below is extremely dirty! Use a library like moment!
  let hour = d.getHours() + ''
  if (hour.length === 1) {
    hour = '0' + hour
  }
  let minutes = d.getMinutes() + ''
  if (minutes.length === 1) {
    minutes = '0' + minutes
  }
  return `${year}/${month}/${date} ${hour}:${minutes}`
}

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(edge => (
      <ArticleListItem
        title={edge.node.frontmatter.title}
        date={formatDate(new Date(edge.node.frontmatter.date))}
        path={edge.node.fields.slug}
        excerpt={edge.node.excerpt}
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
          excerpt(pruneLength: 30)
        }
      }
    }
  }
`
