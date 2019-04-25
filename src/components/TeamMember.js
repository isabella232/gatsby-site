import React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"

class TeamMember extends React.Component {
    render() {
        const data = this.props.teamMember

        return (
            <div className="col-3 teammember">
                <span className="image fit teammember">
                    <Img fluid={data.image.childImageSharp.fluid} />
                </span>
                <span>{data.name}<br/>{data.job_title}</span>
                <p>
                    {data.twitter && data.twitter.length > 0 &&
                    <a href={'https://twitter.com/' + data.twitter} target="_blank" class="icon" rel="noopener noreferrer">
                        <i class="fa fa-twitter"></i>
                    </a>
                    }
                    {data.github && data.github.length > 0 &&
                    <a href={'https://github.com/' + data.github} target="_blank" class="icon" rel="noopener noreferrer">
                        <i class="fa fa-github"></i>
                    </a>
                    }
                    {data.linkedin && data.linkedin.length > 0 &&
                    <a href={'https://nl.linkedin.com/in/' + data.linkedin} target="_blank" class="icon" rel="noopener noreferrer">
                        <i class="fa fa-linkedin"></i>
                    </a>
                    }
                    {data.magento && data.magento.length > 0 &&
                    <a href={data.magento} target="_blank" class="icon" rel="noopener noreferrer">
                        <i class="fab fa-magento"></i>
                    </a>
                    }
                    {data.laravel && data.laravel.length > 0 &&
                    <a href={data.laravel} target="_blank" class="icon" rel="noopener noreferrer">
                        <i class="fab fa-laravel"></i>
                    </a>
                    }
                </p>
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
