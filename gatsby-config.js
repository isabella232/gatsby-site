module.exports = {
  siteMetadata: {
    title: "elgentos ecommerce solutions",
    author: "Peter Jaap Blaakmeer",
    description: "magento 2 webshops met een hoge kwaliteit door gebouwd door professionals die u kunt vertrouwen"
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
    'gatsby-plugin-offline',
    `gatsby-transformer-csv`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `data`,
            path: `${__dirname}/src/data/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/assets/images/`,
        },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/collections/blogposts`,
          name: 'blogposts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/collections/jobs`,
          name: 'jobs',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
      {
          resolve: `gatsby-transformer-remark`,
          options: {
              plugins: [
                  `gatsby-plugin-remove-trailing-slashes`,
                  {
                      resolve: `gatsby-remark-images`,
                      options: {
                          maxWidth: 700,
                          withWebp: true
                      },
                  },
                  {
                      resolve: `gatsby-remark-responsive-iframe`,
                      options: {
                          wrapperStyle: `margin-bottom: 1.0725rem`,
                      },
                  },
                  {
                      resolve: `gatsby-remark-prismjs`,
                      options: {
                          classPrefix: "language-",
                          inlineCodeMarker: null,
                          aliases: {sh: "bash"},
                          // This toggles the display of line numbers alongside the code.
                          // To use it, add the following line in src/layouts/index.js
                          // right after importing the prism color scheme:
                          //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
                          // Defaults to false.
                          showLineNumbers: false,
                          noInlineHighlight: false,
                      },
                  },
                  `gatsby-remark-reading-time`,
                  'gatsby-remark-prismjs',
                  'gatsby-remark-copy-linked-files',
                  'gatsby-remark-smartypants',
              ],
          },
      },
  ],
}
