import * as React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const query = graphql`
  query FavIconQuery {
    icon: file(base: { eq: "icon-100.png" }) {
      src: publicURL
    }
  }
`;

const FavIcon = () => (
  <StaticQuery
    query={query}
    render={({ icon }) => (
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={icon.src}
        />
      </Helmet>
    )}
  />
);

export default FavIcon;
