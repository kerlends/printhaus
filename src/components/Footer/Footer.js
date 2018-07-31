/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InstagramIcon from '../InstagramIcon';

const enhance = withStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  handle: {
    marginLeft: theme.spacing.unit / 2,
    lineHeight: '1',
  },
  link: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
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
      <span className={classes.handle}>{'@printhausco'}</span>
    </a>
  </footer>
);

export default enhance(Footer);
