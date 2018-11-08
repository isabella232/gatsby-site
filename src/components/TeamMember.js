import React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"

class TeamMember extends React.Component {
    render() {
        const data = this.props.teamMember
        return (
            <div className="col-3">
                <span className="image fit">
                    <Img fluid={data.image.childImageSharp.fluid} />
                </span>
                <p>{data.name}<br/>{data.job_title}</p>
            </div>
        );
    }
};

export default TeamMember;

export const TeamMemberFragment = graphql`
   fragment teamMember on TeamCsv {
        image {
            childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;