/* @flow */

import * as React from 'react';
import StoreItemDetails from '../../components/StoreItemDetails';

type Props = {
  data: any,
};

const ProductDetails = ({
  data: { shopifyProduct },
}: Props) => <StoreItemDetails {...shopifyProduct} />;

export default ProductDetails;

export const query = graphql`
  query Product($handle: String!) {
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
