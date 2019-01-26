/* @flow */

import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import DocPage from '../components/DocPage';

const Page = ({ classes, data: { page } }) => (
  <Layout>
    <DocPage title={page.title} html={page.html} />
  </Layout>
);

export const query = graphql`
  query($handle: String) {
    page: shopifyPage(handle: { eq: $handle }) {
      title
      html: body_html
    }
  }
`;

export default Page;
