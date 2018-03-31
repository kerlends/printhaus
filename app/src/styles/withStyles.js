// @flow

import * as React from 'react';
import { ThemeConsumer } from './ThemeProvider';
import createStyles, {
  type ClassNameMap,
  type StylesFactory,
} from './createStyles';

function withStyles<
  Styles: any,
  Props: any,
  InputComponent: React.ComponentType<Props>,
>(
  stylesFactory: StylesFactory<Styles>,
): (
  Component: InputComponent,
) => React.ComponentType<
  $Diff<
    React.ElementConfig<InputComponent>,
    { classes: ClassNameMap<Styles> | void },
  >,
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
