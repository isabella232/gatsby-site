import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class Success extends React.Component {
    render() {
        return (
            <Layout>
                <Helmet>
                    <title>Bedankt | elgentos ecommerce solutions</title>
                    <meta name="description" content="Bedankt" />
                </Helmet>

                <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h1>Bedankt voor je mail</h1>
                            </header>
                            <p>We nemen zo snel mogelijk contact met je op.</p>
                        </div>
                    </section>
                </div>

            </Layout>
        )
    }
}

export default Success