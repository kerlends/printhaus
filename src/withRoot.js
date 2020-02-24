// @flow

import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getPageContext from './getPageContext';

type EnhancedProps = {
  pageContext: any,
};

function withRoot<P>(Component: React.ComponentType<P>) {
  class WithRoot extends React.Component<
    $Diff<P, EnhancedProps>,
  > {
    pageContext: any = null;

    constructor(props: any) {
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
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
