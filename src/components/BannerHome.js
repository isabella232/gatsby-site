import React from 'react'
import Img from 'gatsby-image';

const BannerHome = (props) => (
    <section id="banner" className="major">
        <Img
            sizes={props.banner.sizes}
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            }}
        />
        <div className="inner">
            <header className="major">
                <h1>{props.title}</h1>
            </header>
            <div className="content">
                <p>{props.content}</p>
                {props.cta && props.cta.length > 0 &&
                <ul className="actions">
                    <li><a href="#one" className="button next scrolly">{props.cta}</a></li>
                </ul>
                }
            </div>
        </div>
    </section>
)

export default BannerHome
