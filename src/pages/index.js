// @flow

import * as React from 'react';
import CollectionProductList from '../components/CollectionProductList';

const IndexPage = ({ data: { allShopifyProduct } }: any) => (
  <CollectionProductList
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
                sizes(maxWidth: 500, maxHeight: 300) {
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
