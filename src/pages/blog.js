import { graphql, Link } from "gatsby"
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import get from 'lodash/get'

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const siteDescription = get(
            this,
            'props.data.site.siteMetadata.description'
        )
        const posts = get(this, 'props.data.allMarkdownRemark.edges')

        return (
            <Layout location={this.props.location}>
                <Helmet
                    htmlAttributes={{ lang: 'nl' }}
                    meta={[{ name: 'description', content: siteDescription }]}
                    title={siteTitle}
                />
                {posts.map(({ node }) => {
                    const title = get(node, 'frontmatter.title') || node.fields.slug
                    return (
                        <div key={node.fields.slug}>
                            <h3>
                                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                                    {title}
                                </Link>
                            </h3>
                            <small>{node.frontmatter.date} - {node.fields.readingTime.text}</small>
                            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                        </div>
                    )
                })}
            </Layout>
        )
    }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
