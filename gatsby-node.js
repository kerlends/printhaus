// @flow

const createCollectionPages = require('./createPages/collection');
const createProductDetailsPages = require('./createPages/productDetails');
const createShopPages = require('./createPages/shopifyPage');

exports.createPages = (args) =>
  Promise.all([
    createCollectionPages((handle) => `/${handle}/`, args),
    createProductDetailsPages(
      (handle) => `/store/${handle}`,
      args,
    ),
    createShopPages((handle) => `/${handle}`, args),
  ]);
