/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from 'gatsby-link';
import PrinthausLogo from '../PrinthausLogo';
import HeaderNavLink from './HeaderNavLink';

const enhance = withStyles((theme) => ({
  logo: {
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  logoSvg: {
    height: '3em',
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

type Props = {
  classes: any,
  collections: {
    edges: Array<{
      node: {
        title: string,
        handle: string,
      },
    }>,
  },
};

const Header = ({ classes, collections }: Props) => (
  <header>
    <Link to="/" className={classes.link}>
      <PrinthausLogo
        className={classes.logo}
        svgClassName={classes.logoSvg}
      />
    </Link>
    <div className={classes.nav}>
      <HeaderNavLink to="/" label="All" exact />
      {collections.edges.map(({ node: { title, handle } }) => (
        <HeaderNavLink
          key={handle}
          to={`/${handle}`}
          label={title}
        />
      ))}
    </div>
  </header>
);

export const fragment = graphql`
  fragment CollectionsFragment on RootQueryType {
    collections: allShopifyCollection {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;

export default enhance(Header);
