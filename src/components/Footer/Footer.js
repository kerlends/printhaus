/* @flow */

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InstagramIcon from '../InstagramIcon';

const enhance = withStyles((theme) => ({
  footer: {
    color: theme.palette.getContrastText(
      theme.palette.background.default,
    ),
    display: 'flex',
    justifyContent: 'center',
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
}));

type Props = {
  classes: any,
  instagramProfileUrl: string,
};

const Footer = ({ classes, instagramProfileUrl }: Props) => (
  <footer className={classes.footer}>
    <a
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
    </a>
  </footer>
);

export default enhance(Footer);
