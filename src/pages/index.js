import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'

import elgentos3 from '../assets/images/splash/elgentos-3.jpg'
import elgentos4 from '../assets/images/splash/elgentos-4.jpg'
import elgentos6 from '../assets/images/splash/elgentos-6.jpg'
import elgentos10 from '../assets/images/splash/elgentos-10.jpg'
import elgentos15 from '../assets/images/splash/elgentos-15.jpg'
import elgentos22 from '../assets/images/splash/elgentos-22.jpg'

class HomeIndex extends React.Component {
    render() {

        return (
            <Layout>
                <Helmet
                    title="elgentos ecommerce solutions"
                    meta={[
                        { name: 'description', content: 'magento 2 webshops met een hoge kwaliteit door gebouwd door professionals die u kunt vertrouwen.' },
                        { name: 'keywords', content: 'magento, magento 2, laravel, gatsbyjs' },
                    ]}
                >
                </Helmet>

                <Banner />

                <div id="main">
                    <section id="one" className="tiles">
                        <article style={{backgroundImage: `url(${elgentos15})`}}>
                            <header className="major">
                                <h3>Klantcases</h3>
                                <p>Mooie projecten verdienen aandacht</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${elgentos6})`}}>
                            <header className="major">
                                <h3>Team</h3>
                                <p>Techneuten met passie voor code</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${elgentos4})`}}>
                            <header className="major">
                                <h3>Magento 2</h3>
                                <p>Waarom overstappen loont</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${elgentos10})`}}>
                            <header className="major">
                                <h3>Partners</h3>
                                <p>Gave projecten doen we niet alleen</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${elgentos22})`}}>
                            <header className="major">
                                <h3>Vacatures</h3>
                                <p>Wij zoeken versterking!</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${elgentos3})`}}>
                            <header className="major">
                                <h3>Contact</h3>
                                <p>Koffie?</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                    </section>
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>Magento 2 webshops</h2>
                            </header>
                            <p>Wil je een magento webshop beginnen of je bestaande magento webshop optimaliseren? elgentos is gespecialiseerd in het begeleiden van het 'denkproces over de webshops', het ontwerpen-, het ontwikkelen en onderhouden van webshops. Mooie, stabiele en goed converterende webshops bouwen, dat is het uitgangspunt van waaruit wij werken. We zijn in 2010 begonnen met webshops bouwen op Magento en dit is sindsdien onze primaire focus gebleven.</p>
                            <ul className="actions">
                                <li><Link to="/landing" className="button next">Waarom Magento 2?</Link></li>
                            </ul>
                        </div>
                    </section>
                </div>

            </Layout>
        )
    }
}

export default HomeIndex