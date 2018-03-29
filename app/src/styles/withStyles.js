// @flow

import * as React from 'react';
import { ThemeConsumer } from './ThemeProvider';
import createStyles, {
  type ClassNameMap,
  type StylesFactory,
} from './createStyles';

function withStyles<Styles, Props>(
  stylesFactory: StylesFactory<Styles>,
): (
  React.ComponentType<Props>,
) => React.ComponentType<
  $Diff<Props, { classes: ClassNameMap<Styles> | void }>,
> {
  return (Component) => {
    const WithStyles = (props: Props) => (
      <ThemeConsumer>
        {(theme) => {
          const classes = createStyles(stylesFactory, theme);
          return <Component {...props} classes={classes} />;
        }}
      </ThemeConsumer>
    );

    return WithStyles;
  };
}

export default withStyles;
