require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'printhaus',
  },
  plugins: [
    'gatsby-source-shopifypages',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: process.env.SHOPIFY_SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        verbose: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'printhaus',
        short_name: 'printhaus',
        start_url: '/',
        background_color: '#252525',
        theme_color: '#252525',
        display: 'minimal-ui',
        icon: 'src/images/icon-125.png',
      },
    },
    'gatsby-plugin-netlify',
  ],
};
