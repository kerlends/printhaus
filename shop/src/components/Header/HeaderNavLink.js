/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'gatsby-link';

const enhance = withStyles((theme) => ({
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
    textTransform: 'lowercase',
    '&:not(:last-child):after': {
      content: '"|"',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  navLinkActive: {
    textDecoration: 'underline',
  },
}));

type Props = {
  classes: any,
  to: string,
  label: string,
};

const HeaderNavLink = ({
  classes,
  to,
  label,
  ...props
}: Props) => (
  <Typography
    component={Link}
    className={classes.navLink}
    activeClassName={classes.navLinkActive}
    variant="caption"
    to={to}
    {...props}
  >
    {label}
  </Typography>
);

export default enhance(HeaderNavLink);
