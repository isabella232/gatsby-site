import { graphql } from "gatsby"
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerLanding from '../components/BannerLanding'
import TeamMember from "../components/TeamMember";

class TeamClass extends React.Component {
    render() {
        const data = this.props.data.allTeamCsv.edges

        return (
            <Layout>
                <Helmet>
                    <title>Team | elgentos ecommerce solutions</title>
                    <meta name="description" content="Team" />
                </Helmet>

                <BannerLanding title="Team" content={'Ons ' + data.length + '-koppig team staat voor je klaar!'} />

                <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <div className="box alt">
                                <div className="grid-wrapper">
                                    {data.map((row) => (
                                        <TeamMember teamMember={row.node} />
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

export default TeamClass

export const TeamQuery = graphql`
  query {
    allTeamCsv {
      edges {
        node {
          id
          name
          job_title
          twitter
          github
          linkedin
          ...teamMember
        }
      }
    }
  }
`