// @flow

import React from 'react';
import Navbar from '../components/Navbar';

type Props = {
  children: any,
  data: any,
  location: any,
};

const Layout = ({ children, data, location }: Props) => (
  <React.Fragment>
    {/*
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    */}
    <Navbar pathname={location.pathname} />
    <div>{children()}</div>
  </React.Fragment>
);

export default Layout;
/*
export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
*/
