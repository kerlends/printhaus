// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Navbar from '../components/Navbar';
import withRoot from '../withRoot';

type Props = {
  children: any,
  data: any,
  location: any,
};

const Layout = ({ children, data, location }: Props) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Navbar pathname={location.pathname} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default withRoot(Layout);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
