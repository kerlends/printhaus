/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from 'gatsby-link';
import PrinthausLogo from '../PrinthausLogo';
import HeaderNavLink from './HeaderNavLink';

const enhance = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(
      theme.palette.background.default,
    ),
  },
  logo: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 4,
    },
  },
  logoSvg: {
    height: '100%',
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    height: '3em',
    [theme.breakpoints.up('md')]: {
      height: '5em',
    },
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
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
  <header className={classes.root}>
    <Link to="/" className={classes.link}>
      <PrinthausLogo
        className={classes.logo}
        svgClassName={classes.logoSvg}
      />
    </Link>
    <div className={classes.nav}>
      <HeaderNavLink to="/" label="All" exact />
      {collections.edges.map(
        ({ node: { title, handle, products } }) =>
          products.length > 0 ? (
            <HeaderNavLink
              key={handle}
              to={`/${handle}`}
              label={title}
            />
          ) : null,
      )}
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
          products {
            id
          }
        }
      }
    }
  }
`;

export default enhance(Header);
