const path = require('path');

module.exports = (
  getPageUrl,
  { boundActionCreators, graphql },
) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query ShopifyPages {
          allShopifyPage {
            edges {
              node {
                handle
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) reject(result.errors);

        result.data.allShopifyPage.edges.forEach(
          ({ node: { handle } }) => {
            const pageUrl = getPageUrl(handle);

            createPage({
              path: pageUrl,
              component: path.join(
                __dirname,
                '..',
                'src/templates/Page/Page.js',
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
