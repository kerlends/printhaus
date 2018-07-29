// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import Cart from '../components/Cart';
import withRoot from '../withRoot';

type Props = {
  children: any,
  data: any,
  location: any,
};

const Layout = ({ children, data, location }: Props) => (
  <React.Fragment>
    <Helmet>
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={data.icon.src}
      />
    </Helmet>
    <Cart />
    <div>{children()}</div>
  </React.Fragment>
);

export default withRoot(Layout);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    icon: file(base: { eq: "icon-100.png" }) {
      src: publicURL
    }
  }
`;
