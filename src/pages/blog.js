import { graphql, Link } from "gatsby"
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import get from 'lodash/get'
import BannerLanding from "../components/BannerLanding";

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
                <BannerLanding title="Blog" content="" />

                <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <div className="box alt">
                                <div className="grid-wrapper">
                                    {posts.map(({ node }) => {
                                        const title = get(node, 'frontmatter.title') || node.fields.slug
                                        return (
                                            <div key={node.fields.slug} className="col-6">
                                                <h3>
                                                    <Link style={{ boxShadow: 'none' }} to={node.frontmatter.permalink}>
                                                        {title}
                                                    </Link>
                                                </h3>
                                                <small>{node.frontmatter.date} - {node.fields.readingTime.text}</small>
                                                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
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
            date(formatString: "D MMMM YYYY", locale: "nl")
            title
            permalink
          }
        }
      }
    }
  }
`
