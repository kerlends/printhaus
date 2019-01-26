import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import {
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InstagramIcon from '../InstagramIcon';
import FooterLink from '../FooterLink';

const styles = (theme) =>
  createStyles({
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
  });

const query = graphql`
  query FooterQuery {
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

const Footer = ({ classes, instagramProfileUrl }) => (
  <StaticQuery
    query={query}
    render={({ pages }) => (
      <footer className={classes.footer}>
        <div className={classes.nav}>
          {pages.edges.map(({ node }) => (
            <FooterLink
              key={node.handle}
              to={'/' + node.handle}
            />
          ))}
        </div>
        {/* @ts-ignore */}
        <OutboundLink
          className={classes.link}
          alt="printhaus instagram"
          href="https://www.instagram.com/printhausco"
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
    )}
  />
);

export default withStyles(styles)(Footer);
