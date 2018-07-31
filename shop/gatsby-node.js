// @flow

const createCollectionPages = require('./createPages/collection');
const createProductDetailsPages = require('./createPages/productDetails');

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat([
    'transform-regenerator',
    'transform-runtime',
  ]),
});

exports.createPages = (args) =>
  Promise.all([
    createCollectionPages((handle) => `/${handle}/`, args),
    createProductDetailsPages(
      (handle) => `/store/${handle}`,
      args,
    ),
  ]);
