// @flow

import * as React from 'react';
import ProductList from 'components/ProductList';

const Collection = ({
  data: {
    shopifyCollection: { title, products },
  },
}: any) => <ProductList title={title} products={products} />;

export const query = graphql`
  query Collection($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      handle
      title
      products {
        id: shopifyId
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
      }
    }
  }
`;

export default Collection;
