import React from 'react'
import {Link} from "gatsby";
import Img from 'gatsby-image';

const ArticleTile = (props) => (
    <article>
        <Img
            sizes={props.background.sizes}
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            }}
        />
        <header className="major">
            <h3>{props.title}</h3>
            <p aria-hidden={true}>{props.content}</p>
        </header>
        <Link to={props.link} className="link primary" alt={props.title} title={props.title}></Link>
    </article>
)

export default ArticleTile
