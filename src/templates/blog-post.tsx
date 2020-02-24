import React from 'react'
import { graphql } from 'gatsby'
import { liveRemarkForm } from 'gatsby-tinacms-remark'
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from 'tinacms'
import { Button as TinaButton } from '@tinacms/styles'

import Layout from '../components/layout'
import D8 from '../components/atom/Date'
import typography from '../utils/typography'

const BlogPostForm = {
  fields: [
    {
      label: 'Title',
      name: 'frontmatter.title',
      description: 'Enter the title of the post here',
      component: 'text',
    },
    {
      label: 'Date',
      name: 'frontmatter.date',
      component: 'date',
      timeFormat: true,
    },
    {
      name: 'frontmatter.draft',
      component: 'toggle',
      label: 'Draft',
    },
    {
      label: 'Body',
      name: 'rawMarkdownBody',
      description: 'Enter the post body',
      component: 'textarea',
    },
  ],
}

function BlogPostTemplate({ data, isEditing, setIsEditing }) {
  const post = data.markdownRemark

  return (
    <Layout>
      {process.env.NODE_ENV != 'production' && (
        <TinaButton primary onClick={() => setIsEditing(p => !p)}>
          {isEditing ? 'Preview' : 'Edit'}
        </TinaButton>
      )}
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...typography.scale(-1 / 5),
          display: `block`,
          marginBottom: typography.rhythm(1),
        }}
      >
        {post.frontmatter.draft ? 'Draft' : <D8>{post.frontmatter.date}</D8>} ・{' '}
        <span>{post.timeToRead}</span> min read
      </p>
      <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
        <section
          style={{ marginTop: '3.0rem' }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </TinaField>
    </Layout>
  )
}

export default liveRemarkForm(BlogPostTemplate, BlogPostForm)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(published: { eq: true }, fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        draft
      }
      timeToRead
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
      ...TinaRemark
    }
  }
`
