/* @flow */

import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsTemplate = ({
  data: { shopifyProduct },
}) => (
  <Layout>
    <ProductDetails {...shopifyProduct} />
  </Layout>
);

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      description: descriptionHtml
      images {
        id
        localFile {
          childImageSharp {
            sizes(maxWidth: 500) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      title
      variants {
        availableForSale
        price
        title
        id: shopifyId
      }
    }
  }
`;

export default ProductDetailsTemplate;
