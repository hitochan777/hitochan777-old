import React from 'react'
import { graphql } from 'gatsby'
import { usePlugin } from 'tinacms'
import {
  DeleteAction,
  inlineRemarkForm,
  useRemarkForm,
} from 'gatsby-tinacms-remark'
import ReactMarkdown from 'react-markdown'
import {
  useInlineForm,
  InlineForm,
  InlineWysiwyg,
  InlineTextField,
} from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

import Layout from '../components/layout'
import D8 from '../components/atom/Date'
import typography from '../utils/typography'

const BlogPostForm = {
  actions: [DeleteAction],
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

export function EditToggle() {
  // Access 'edit mode' controls via `useInlineForm` hook
  const { status, deactivate, activate } = useInlineForm()

  return (
    <TinaButton
      primary
      onClick={() => {
        status === 'active' ? deactivate() : activate()
      }}
    >
      {status === 'active' ? 'Preview' : 'Edit'}
    </TinaButton>
  )
}

export function DiscardButton() {
  const { form } = useInlineForm()

  if (form.finalForm.getState().pristine) {
    return null
  }

  return (
    <TinaButton
      color="primary"
      onClick={() => {
        form.finalForm.reset()
      }}
    >
      Discard Changes
    </TinaButton>
  )
}

function BlogPostTemplate({ data }) {
  const [markdownRemark, form] = useRemarkForm(
    data.markdownRemark,
    BlogPostForm
  )
  usePlugin(form)

  return (
    <Layout>
      <InlineForm form={form}>
        {process.env.NODE_ENV != 'production' && (
          <>
            <EditToggle />
            <DiscardButton />
          </>
        )}
        <h1>
          <InlineTextField name="rawFrontmatter.title" />
        </h1>
        <p
          style={{
            ...typography.scale(-1 / 5),
            display: `block`,
            marginBottom: typography.rhythm(1),
          }}
        >
          {markdownRemark.frontmatter.draft ? (
            'Draft'
          ) : (
            <D8>{markdownRemark.frontmatter.date}</D8>
          )}{' '}
          ・ <span>{data.markdownRemark.timeToRead}</span> min read
        </p>
        <InlineWysiwyg name="rawMarkdownBody" format="markdown">
          <div
            dangerouslySetInnerHTML={{
              __html: markdownRemark.html,
            }}
          />
        </InlineWysiwyg>
      </InlineForm>
    </Layout>
  )
}

export default inlineRemarkForm(BlogPostTemplate)

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
