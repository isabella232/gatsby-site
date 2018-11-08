import React from 'react'

const BannerHome = (props) => (
    <section id="banner" className="major">
        <div className="inner">
            <header className="major">
                <h1>{props.title}</h1>
            </header>
            <div className="content">
                <p>{props.content}</p>
                <ul className="actions">
                    <li><a href="#one" className="button next scrolly">{props.cta}</a></li>
                </ul>
            </div>
        </div>
    </section>
)

export default BannerHome
