/* @flow */

import * as React from 'react';
import { StoreItemDetails } from '../../components';

type Props = {
  data: {
    shopifyProduct: React.ElementProps<typeof StoreItemDetails>,
  },
};

const ProductDetails = ({
  data: { shopifyProduct },
}: Props) => <StoreItemDetails {...shopifyProduct} />;

export default ProductDetails;

export const query = graphql`
  query Product($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      description
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
        id
      }
    }
  }
`;
