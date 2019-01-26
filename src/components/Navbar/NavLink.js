// @flow

import * as React from 'react';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const enhance = withStyles((theme) => ({
  link: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontWeight: 200,
    marginBottom: theme.spacing.unit * 2,
    '&::after': {
      content: '""',
      display: 'block',
      height: 2,
      width: '100%',
      backgroundColor: 'currentColor',
      opacity: 0,
    },
  },
  activeLink: {
    '&::after': {
      opacity: 1,
    },
  },
}));

const NavLink = ({ classes, to, label }) => (
  <Typography
    className={classes.link}
    activeClassName={classes.activeLink}
    component={Link}
    color="inherit"
    to={to}
    variant="headline"
  >
    {label}
  </Typography>
);

export default enhance(NavLink);
