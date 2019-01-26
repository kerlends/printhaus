// @flow

import * as React from 'react';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getPageContext from './getPageContext';

function withRoot(Component) {
  class WithRoot extends React.Component {
    pageContext = null;

    constructor(props) {
      super(props);
      this.pageContext =
        this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      const jssStyles = document.querySelector(
        '#server-side-jss',
      );
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <ThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <CssBaseline />
          <Component {...this.props} />
        </ThemeProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
