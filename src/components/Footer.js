import React from 'react'

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li><a href="https://twitter.com/elgentos" className="icon alt fa-twitter" alt={'Twitter'} title={'Twitter'}><span className="label">Twitter</span></a></li>
                <li><a href="https://github.com/elgentos" className="icon alt fa-github" alt={'GitHub'} title={'GitHub'}><span className="label">GitHub</span></a></li>
                <li><a href="https://www.linkedin.com/company/elgentos/" className="icon alt fa-linkedin" alt={'LinkedIn'} title={'LinkedIn'}><span className="label">LinkedIn</span></a></li>
            </ul>
            <ul className="copyright" aria-hidden={true}>
                <li>&copy; elgentos</li><li>Built with: <a href="https://gatsbyjs.org" alt="GatsbyJS" title={'GatsbyJS'}>GatsbyJS</a></li><li><a href="https://www.foundedingroningen.com/" alt="Founded in Groningen" title={'Founded in Groningen'}>Founded in Groningen</a></li>
            </ul>
        </div>
    </footer>
)

export default Footer
