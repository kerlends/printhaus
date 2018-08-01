// @flow

const createCollectionPages = require('./createPages/collection');
const createProductDetailsPages = require('./createPages/productDetails');
const createShopPages = require('./createPages/shopifyPage');

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat([
    'transform-regenerator',
    'transform-runtime',
    [
      'transform-imports',
      {
        'react-jss': {
          transform: 'react-jss/lib/${member}',
        },
        ramda: {
          transform: 'ramda/src/${member}',
          preventFullImports: true,
        },
        '@material-ui/core': {
          transform: '@material-ui/core/${member}',
        },
        '@material-ui/core/styles': {
          transform: '@material-ui/core/styles/${member}',
        },
      },
    ],
  ]),
});

exports.createPages = (args) =>
  Promise.all([
    createCollectionPages((handle) => `/${handle}/`, args),
    createProductDetailsPages(
      (handle) => `/store/${handle}`,
      args,
    ),
    createShopPages((handle) => `/${handle}`, args),
  ]);
