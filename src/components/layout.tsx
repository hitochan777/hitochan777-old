import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { withPlugin } from 'tinacms'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

import Header from './header'
import Footer from './footer'
import './layout.css'

const CreateBlogPlugin = new RemarkCreatorPlugin({
  label: 'New Blog Post',
  filename: form => {
    const slug = form.title.replace(/\s+/g, '-').toLowerCase()
    form.date = form.date ?? new Date()
    const year = `${form.date.getFullYear()}`
    const month = `${form.date.getMonth() + 1}`.padStart(2, '0')
    const day = `${form.date.getDate()}`.padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    return `_posts/blog/${dateStr}-${form.title}.md`
  },
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'title',
      placeholder: 'title here',
    },
    {
      name: 'date',
      component: 'date',
      label: 'Date',
      placeholder: '',
      timeFormat: true,
    },
    {
      name: 'draft',
      component: 'toggle',
      label: 'Draft',
    },
  ],
  frontmatter: postInfo => ({
    layout: 'blog',
    title: postInfo.title,
    date: postInfo.date ?? new Date(),
    draft: postInfo.draft ?? false,
  }),
})

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 3rem`,
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    )}
  />
)

export default withPlugin(Layout, CreateBlogPlugin)
