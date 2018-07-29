// @flow

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Header, StoreListItem } from '../components';
import withRoot from '../withRoot';

const IndexPage = ({ data }: any) => (
  <React.Fragment>
    <Helmet
      title="printhaus | store"
      meta={[
        {
          name: 'description',
          content: 'printhaus store',
        },
        {
          name: 'keywords',
          content: 'printhaus, store, portland, gothlol',
        },
      ]}
    />
    <Header />
    <div>
      {data.allShopifyProduct.edges.map(
        ({ node: { id, ...item } }) => (
          <StoreListItem key={id} {...item} />
        ),
      )}
    </div>
  </React.Fragment>
);

export const query = graphql`
  query Products {
    allShopifyProduct {
      edges {
        node {
          id
          description
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

export default withRoot(IndexPage);
