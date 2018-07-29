// @flow

import * as React from 'react';
import { StoreListItem } from '../components';
import withRoot from '../withRoot';

const IndexPage = ({ data }: any) => (
  <div>
    {data.allShopifyProduct.edges.map(
      ({ node: { id, ...item } }) => (
        <StoreListItem key={id} {...item} />
      ),
    )}
  </div>
);

export const query = graphql`
  query Products {
    allShopifyProduct {
      edges {
        node {
          id
          description
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

export default withRoot(IndexPage);
