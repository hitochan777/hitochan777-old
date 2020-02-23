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
    return form.filename
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description:
        'The full path to the new markdown file, relative to the repository root.',
    },
  ],
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
