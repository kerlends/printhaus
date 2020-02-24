/* @flow */

import * as React from 'react';
import ProductDetails from 'components/ProductDetails';

type Props = {
  data: any,
};

const ProductDetailsTemplate = ({
  data: { shopifyProduct },
}: Props) => <ProductDetails {...shopifyProduct} />;

export default ProductDetailsTemplate;

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
