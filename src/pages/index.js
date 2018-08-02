// @flow

import * as React from 'react';
import ProductList from 'components/ProductList';

const IndexPage = ({ data: { allShopifyProduct } }: any) => (
  <ProductList
    products={allShopifyProduct.edges.map(({ node }) => node)}
    title="store"
  />
);

export const query = graphql`
  query Products {
    allShopifyProduct {
      edges {
        node {
          id
          handle
          images {
            id
            localFile {
              childImageSharp {
                sizes(
                  maxWidth: 500
                  maxHeight: 300
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
          title
          variants {
            availableForSale
            price
          }
        }
      }
    }
  }
`;

export default IndexPage;
