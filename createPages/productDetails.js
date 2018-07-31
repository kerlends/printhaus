const path = require('path');

module.exports = (
  getPageUrl,
  { boundActionCreators, graphql },
) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query {
          allShopifyProduct {
            edges {
              node {
                handle
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) reject(result.errors);

        result.data.allShopifyProduct.edges.forEach(
          ({ node: { handle } }) => {
            const pageUrl = getPageUrl(handle);

            createPage({
              path: pageUrl,
              component: path.join(
                __dirname,
                '..',
                'src/templates/ProductDetails/ProductDetails.js',
              ),
              layout: 'index',
              context: {
                handle,
              },
            });
          },
        );
      }),
    );
  });
};
