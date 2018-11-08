module.exports = {
  siteMetadata: {
    title: "elgentos.n l",
    author: "Peter Jaap Blaakmeer",
    description: "elgentos ecommerce solutions"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-favicon`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ],
}
