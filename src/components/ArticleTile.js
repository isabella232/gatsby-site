import React from 'react'
import {Link} from "gatsby";

const ArticleTile = (props) => (
    <article style={{backgroundImage: `url(${props.background})`}}>
        <header className="major">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </header>
        <Link to={props.link} className="link primary"></Link>
    </article>
)

export default ArticleTile
