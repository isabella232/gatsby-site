import React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"

class Partner extends React.Component {
    render() {
        const data = this.props.partner
        return (
            <div className="col-4">
                <span className="image fit partner">
                    <Img fixed={data.image.childImageSharp.fixed} />
                </span>
                <p><a href={data.url} target={'_new'}>{data.name}</a></p>
            </div>
        );
    }
};

export default Partner;

export const PartnerFragment = graphql`
   fragment partner on PartnersCsv {
        image {
            childImageSharp {
                fixed(height: 300, width: 300, quality: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
    }
`;