require('dotenv').config();

const crypto = require('crypto');
const fetch = require('isomorphic-fetch');

const shop = process.env.SHOPIFY_SHOP_NAME;
const token = process.env.SHOPIFY_CLIENT_SECRET;

const url = `https://${shop}.myshopify.com/admin/pages.json`;

console.log({ shop, token, url });

const fetchNodes = async () => {
  const data = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      'x-shopify-access-token': token,
    },
    method: 'GET',
  });

  return (await data.json()).pages;
};

exports.sourceNodes = async ({
  boundActionCreators,
  createNodeId,
} = {}) => {
  const { createNode } = boundActionCreators;
  const processPage = (page) => {
    const nodeId = createNodeId(`shopify-page-${page.id}`);
    const nodeContent = JSON.stringify(page);
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex');

    const node = Object.assign({}, page, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'ShopifyPage',
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    });

    createNode(node);
  };

  const pages = await fetchNodes();

  pages.forEach((page) => processPage(page));
};
