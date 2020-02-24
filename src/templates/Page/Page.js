/* @flow */

import * as React from 'react';
import DocPage from 'components/DocPage';

const Page = ({ classes, data }: any) => (
  <DocPage title={data.page.title} html={data.page.html} />
);

export default Page;

export const query = graphql`
  query Page($handle: String) {
    page: shopifyPage(handle: { eq: $handle }) {
      title
      html: body_html
    }
  }
`;
