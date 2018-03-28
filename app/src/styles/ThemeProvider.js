// @flow

import * as React from 'react';
import createContext, { type Consumer } from 'create-react-context';
import createTheme, { type Theme } from './createTheme';

let defaultTheme;
const getDefaultTheme = () => {
  if (!defaultTheme) defaultTheme = createTheme();
  return defaultTheme;
};

const ThemeContext = createContext({});

type Props = {
  children: React.Node,
  theme?: Theme,
};

type State = {
  theme: Theme,
};

class ThemeProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let { theme } = props;

    if (!theme) theme = getDefaultTheme();

    this.state = {
      theme,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.theme !== nextProps.theme)
      this.setState({ theme: nextProps.theme });
  }

  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;

export const ThemeConsumer: Consumer<Theme> = ThemeContext.Consumer;
