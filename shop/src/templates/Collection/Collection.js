// @flow

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { StoreListItem } from '../../components';
import withRoot from '../../withRoot';

const Collection = ({ data }: any) => (
  <React.Fragment>
    <Helmet
      title={`printhaus | ${data.title}`}
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
      {data.products.edges.map(({ node: { id, ...item } }) => (
        <StoreListItem key={id} {...item} />
      ))}
    </div>
  </React.Fragment>
);

export const query = graphql`
  query Products($title: String!) {
    shopifyCollection({
      title: {
        eq: $title
      }
    }) {
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
        }
      }
    }
  }
`;

export default withRoot(Collection);
