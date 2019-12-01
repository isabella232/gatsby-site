import React from 'react'

class BannerLanding extends React.Component {

    render() {
        let content = '';
        if (this.props.content) {
            content = <div className="content">
                <p>{this.props.content}</p>
            </div>;
        }

        return (
            <section id="banner" className={this.props.type + ' style2'}>
                <div className="inner">
                    <header className="major">
                        <h1>{this.props.title}</h1>
                    </header>
                    {content}
                </div>
            </section>
        )
    }
}


export default BannerLanding
