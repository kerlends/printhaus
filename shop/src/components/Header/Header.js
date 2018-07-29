/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PrinthausLogo from '../PrinthausLogo';

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
}));

type Props = {
  classes: any,
};

const Header = ({ classes }: Props) => (
  <PrinthausLogo
    className={classes.logo}
    svgClassName={classes.logoSvg}
  />
);

export default enhance(Header);
