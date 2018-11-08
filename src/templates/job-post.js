import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import BannerLanding from "../components/BannerLanding";

class JobPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
        const siteDescription = post.excerpt

        return (
            <Layout location={this.props.location}>
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    meta={[{ name: 'description', content: siteDescription }]}
                    title={`${post.frontmatter.title} | ${siteTitle}`}
                />
                <BannerLanding title={post.frontmatter.title} content="Vacatures" />
                <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <div className="box alt">
                                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        )
    }
}

export default JobPostTemplate

export const pageQuery = graphql`
  query JobPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
      }
    }
  }
`
