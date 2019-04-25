import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
          query CipBadgeQuery {
            cip: imageSharp(fixed:{originalName: {eq:"magento-cip-badge.png"}}) {
                sizes {
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
            }
            hypernode: imageSharp(fixed:{originalName: {eq:"hypernode-badge-horizontal.png"}}) {
                sizes {
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
            }
          }
        `}
        render={data => (
            <footer id="footer">
                <div className="inner">
                    <ul className="icons">
                        <li><a href="https://twitter.com/elgentos" className="icon alt fas fa-twitter" alt={'Twitter'}
                               title={'Twitter'} target={'_blank'}><span className="label">Twitter</span></a></li>
                        <li><a href="https://github.com/elgentos" className="icon alt fas fa-github" alt={'GitHub'}
                               title={'GitHub'} target={'_blank'}><span className="label">GitHub</span></a></li>
                        <li><a href="https://www.linkedin.com/company/elgentos/" className="icon alt fas fa-linkedin"
                               alt={'LinkedIn'} title={'LinkedIn'} target={'_blank'}><span className="label">LinkedIn</span></a></li>
                        <li>
                            <a href="https://partners.magento.com/portal/details/partner/id/2070/"
                               alt={'Magento Community Insider Partner'} title={'Magento Community Insider Partner'} target={'_blank'}>
                                <Img
                                    sizes={data.cip.sizes}
                                    className={'magento-cip-badge'}
                                />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.byte.nl/partners/elgentos"
                               alt={'Hypernode Certified Agency'} title={'Hypernode Certified Agency'} target={'_blank'}>
                                <Img
                                    sizes={data.hypernode.sizes}
                                    className={'hypernode-certified-badge'}
                                />
                            </a>
                        </li>
                    </ul>
                    <ul className="copyright" aria-hidden={true}>
                        <li>&copy; elgentos</li>
                        <li>Built with: <a href="https://gatsbyjs.org" alt="GatsbyJS" title={'GatsbyJS'}>GatsbyJS</a>
                        </li>
                        <li><a href="https://www.foundedingroningen.com/" alt="Founded in Groningen"
                               title={'Founded in Groningen'}>Founded in Groningen</a></li>
                    </ul>
                </div>
            </footer>
        )}
    />
)
