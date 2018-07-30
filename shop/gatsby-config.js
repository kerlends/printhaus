require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'printhaus',
  },
  plugins: [
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'printhaus',
        short_name: 'printhaus',
        start_url: '/',
        background_color: '#696969',
        theme_color: '#696969',
        display: 'standalone',
        icon: 'src/images/icon-125.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
