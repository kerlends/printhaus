// @flow

import React from 'react';
import withRoot from '../withRoot';

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
    <div>{children()}</div>
  </React.Fragment>
);

export default withRoot(Layout);
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
