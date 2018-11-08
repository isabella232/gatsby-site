import { graphql } from "gatsby"
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerLanding from '../components/BannerLanding'
import Partner from "../components/Partner";

class PartnerClass extends React.Component {
    render() {
        const data = this.props.data.allPartnersCsv.edges

        return (
            <Layout>
                <Helmet>
                    <title>Partners | elgentos ecommerce solutions</title>
                    <meta name="description" content="Partners" />
                </Helmet>

                <BannerLanding title="Partners" content="Gave projecten doen we niet alleen!" />

                <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <div className="box alt">
                                <div className="grid-wrapper">
                                    {data.map((row) => (
                                        <Partner partner={row.node} />
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
          ...partner
        }
      }
    }
  }
`