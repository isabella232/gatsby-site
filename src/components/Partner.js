import React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"

class Partner extends React.Component {
    render() {
        const data = this.props.partner
        return (
            <div className="col-4">
                <span className="image fit">
                    <Img fluid={data.image.childImageSharp.fluid} />
                </span>
                <p>{data.name}<br/>{data.job_title}</p>
            </div>
        );
    }
};

export default Partner;

export const PartnerFragment = graphql`
   fragment partner on PartnersCsv {
        image {
            childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;