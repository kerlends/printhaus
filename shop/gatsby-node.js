// @flow

const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
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

        console.log({ result });

        result.data.allShopifyProduct.edges.forEach(
          ({ node: { handle } }) => {
            createPage({
              path: `/store/${handle}`,
              component: path.resolve(
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
