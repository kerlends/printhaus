// @flow

import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Collection = ({
  data: {
    shopifyCollection: { title, products },
  },
}) => {
  return (
    <Layout>
      <ProductList title={title} products={products} />
    </Layout>
  );
};

export const query = graphql`
  query($handle: String!) {
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
