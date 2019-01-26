// @flow

import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const IndexPage = ({ data }) => (
  <Layout>
    <ProductList
      products={data.allShopifyProduct.edges.map(
        ({ node }) => node,
      )}
      title="store"
    />
  </Layout>
);

export const query = graphql`
  query {
    allShopifyProduct(
      sort: { fields: [createdAt], order: DESC }
    ) {
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
