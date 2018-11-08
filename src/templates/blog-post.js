import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
          <div id="main" className="alt">
              <section id="one">
                  <div className="inner">
                      <header className="major">
                          <h1>{post.frontmatter.title}</h1>
                      </header>
                      {/*<span className="image main"><img src={pic11} alt="" /></span>*/}
                      <div className="box alt">
                            <p>
                              {post.frontmatter.date} - {post.fields.readingTime.text}
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: post.html }} />
                            <hr />

                            <ul
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                listStyle: 'none',
                                padding: 0,
                              }}
                            >
                              <li>
                                {
                                  previous &&
                                  <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                  </Link>
                                }
                              </li>
                              <li>
                                {
                                  next &&
                                  <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                  </Link>
                                }
                              </li>
                            </ul>
                          </div>
                  </div>
              </section>
          </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "D MMMM YYYY", locale: "nl")
      }
    }
  }
`
