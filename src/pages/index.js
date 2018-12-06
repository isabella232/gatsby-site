import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerHome from '../components/BannerHome'
import FooterCta from '../components/FooterCta'
import ArticleTile from '../components/ArticleTile'
import GoogleMaps from '../components/GoogleMaps'

// import elgentos3 from '../assets/images/splash/elgentos-3.jpg'
import elgentos15 from '../assets/images/splash/elgentos-15.jpg'
import elgentos4 from '../assets/images/splash/elgentos-4.jpg'
import elgentos6 from '../assets/images/splash/elgentos-6.jpg'
// import elgentos10 from '../assets/images/splash/elgentos-10.jpg'
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
                        { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1.0"'}
                    ]}
                >
                </Helmet>

                <BannerHome title="Experts in Magento bouw" content="focus op Magento 2 backend gecombineerd met Laravel gebaseerde microservices en React frontends" />

                <div id="main">
                    <section id="one" className="tiles">
                        {/*<ArticleTile title="Klantcases" content="Mooie projecten verdienen aandacht" link="/klantcases" background={elgentos15}  />*/}
                        <ArticleTile title="Team" content="Techneuten met passie voor code" link="/team" background={elgentos6}  />
                        <ArticleTile title="Blog" content="Kennisdeling vinden we leuk!" link="/blog" background={elgentos4}  />
                        {/*<ArticleTile title="Magento 2" content="Waarom overstappen loont" link="/magento2" background={elgentos4}  />*/}
                        <ArticleTile title="Tech stack" content="Onze favoriete tech om jouw doelen mee te behalen" link="/techstack" background={elgentos15}  />
                        <ArticleTile title="Vacatures" content="Wij zoeken versterking!" link="/vacatures" background={elgentos22}  />
                        {/*<ArticleTile title="Contact" content="Koffie?" link="/contact" background={elgentos3}  />*/}
                    </section>
                    <FooterCta title="Magento 2 webshops" content="Wil je een magento webshop beginnen of je bestaande magento webshop optimaliseren? elgentos is gespecialiseerd in het begeleiden van het 'denkproces over de webshops', het ontwerpen-, het ontwikkelen en onderhouden van webshops. Mooie, stabiele en goed converterende webshops bouwen, dat is het uitgangspunt van waaruit wij werken. We zijn in 2010 begonnen met webshops bouwen op Magento en dit is sindsdien onze primaire focus gebleven." link="/magento2" cta="Waarom Magento 2?" />
                </div>

                <GoogleMaps />

            </Layout>
        )
    }
}

export default HomeIndex