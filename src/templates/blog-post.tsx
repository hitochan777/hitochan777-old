import React from 'react'
import { graphql } from 'gatsby'
import { remarkForm } from 'gatsby-tinacms-remark'

import Layout from '../components/layout'
import D8 from '../components/atom/Date'

function BlogPostTemplate({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <D8>{post.frontmatter.date}</D8> ・ <span>{post.timeToRead}</span> min
      read
      <div
        style={{ marginTop: '3.0rem' }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export default remarkForm(BlogPostTemplate)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
      }
      timeToRead
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
