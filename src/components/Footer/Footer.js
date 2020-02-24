/* @flow */

import * as React from 'react';
import Link from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InstagramIcon from '../InstagramIcon';

const enhance = withStyles((theme) => ({
  footer: {
    color: theme.palette.getContrastText(
      theme.palette.background.default,
    ),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
    },
  },
  handle: {
    marginLeft: theme.spacing.unit / 2,
    //lineHeight: '1',
  },
  link: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  nav: {
    marginBottom: theme.spacing.unit * 3,
  },
}));

type Props = {
  classes: any,
  pages: {
    edges: Array<{
      node: {
        handle: string,
        title: string,
      },
    }>,
  },
  instagramProfileUrl: string,
};

const Footer = ({
  classes,
  pages,
  instagramProfileUrl,
}: Props) => (
  <footer className={classes.footer}>
    <div className={classes.nav}>
      {pages.edges.map(({ node }) => (
        <Typography
          key={node.handle}
          color="inherit"
          component={Link}
          to={'/' + node.handle}
          variant="caption"
        >
          {node.title}
        </Typography>
      ))}
    </div>
    <OutboundLink
      className={classes.link}
      alt="printhaus instagram"
      href={instagramProfileUrl}
      target="_blank"
      rel="noopener"
    >
      <InstagramIcon height={16} width={16} />{' '}
      <Typography
        color="inherit"
        component="span"
        className={classes.handle}
        variant="subheading"
      >
        {'@printhausco'}
      </Typography>
    </OutboundLink>
  </footer>
);

export const fragment = graphql`
  fragment PagesFragment on RootQueryType {
    pages: allShopifyPage {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

export default enhance(Footer);
