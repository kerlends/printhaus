// @flow

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { StoreListItem } from '../../components';
import withRoot from '../../withRoot';

const Collection = ({ data, ...rest }: any) => (
  <React.Fragment>
    <Helmet
      title={`printhaus | ${data.shopifyCollection.title}`}
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

    <div>
      {data.shopifyCollection.products.map(
        ({ id, ...item }) => (
          <StoreListItem key={id} {...item} />
        ),
      )}
    </div>
  </React.Fragment>
);

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
              sizes(maxWidth: 500, maxHeight: 300) {
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

export default withRoot(Collection);
