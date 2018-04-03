/* @flow */

import * as React from 'react';
import { withStyles } from 'styles';

const enhance = withStyles(styles => ({
  // styles
}));

type Props = {
  classes: any,
}

const Component = ({ classes }: Props) => (
  // code
);

export default enhance(Component);
