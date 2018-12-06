import { graphql } from "gatsby"
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerLanding from '../components/BannerLanding'
import Techstack from "../components/Partner";

class PartnerClass extends React.Component {
    render() {
        const data = this.props.data.allPartnersCsv.edges

        return (
            <Layout>
                <Helmet>
                    <title>Tech stack | elgentos ecommerce solutions</title>
                    <meta name="description" content="Tech stack" />
                </Helmet>

                <BannerLanding title="Tech stack" content="Onze favoriete tech om jouw doelen mee te behalen!" />

                <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <div className="box alt">
                                <div className="grid-wrapper">
                                    {data.map((row) => (
                                        <Techstack partner={row.node} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </Layout>
        )
    }
}

export default PartnerClass

export const PartnerQuery = graphql`
  query {
    allPartnersCsv {
      edges {
        node {
          name
          url
          ...partner
        }
      }
    }
  }
`