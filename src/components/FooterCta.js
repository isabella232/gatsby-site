import React from 'react'
import {Link} from "gatsby";

const FooterCta = (props) => (
    <section id="two">
        <div className="inner">
            <header className="major">
                <h2>{props.title}</h2>
            </header>
            <p>{props.content}</p>
            {/*<ul className="actions">*/}
                {/*<li><Link to={props.link} className="button next">{props.cta}</Link></li>*/}
            {/*</ul>*/}
        </div>
    </section>
)

export default FooterCta