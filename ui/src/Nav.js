// @flow

import * as React from 'react';
import classNames from 'classnames';

import { compose } from 'recompose';
import withRouter from 'react-router-dom/withRouter';
import { withStyles } from '@material-ui/core/styles';
import PrinthausLogo from './PrinthausLogo';
import NavMenuButton from './NavMenuButton';
import NavLink from './NavLink';

const enhance = compose(
  withRouter,
  withStyles(
    (theme) =>
      console.log(theme) || {
        nav: {
          position: 'relative',
          zIndex: 1001,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...theme.mixins.toolbar,
        },
        container: {
          zIndex: 1000,
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          pointerEvents: 'none',
          opacity: 0,
          transition: theme.transitions.create('opacity'),
        },
        containerVisible: {
          opacity: 1,
          pointerEvents: 'auto',
        },
      },
  ),
);

type Props = {
  classes: any,
  history: any,
  location: any,
};

type State = {
  show: boolean,
};

class Nav extends React.Component<Props, State> {
  state = {
    show: false,
  };

  componentDidUpdate(lastProps: Props) {
    if (
      this.props.location.pathname !==
        lastProps.location.pathname &&
      this.state.show
    )
      this.toggleContainer(false);
  }

  toggleContainer = (show?: boolean) =>
    this.setState((prevState) => ({
      show: typeof show === 'boolean' ? show : !prevState.show,
    }));

  render() {
    const { classes } = this.props;
    const { show } = this.state;

    return (
      <div>
        <nav className={classes.nav}>
          <PrinthausLogo invert={show} />
          <NavMenuButton
            onClick={this.toggleContainer}
            menuOpen={show}
          />
        </nav>
        <div
          className={classNames(
            classes.container,
            show && classes.containerVisible,
          )}
        >
          <NavLink to="/store" label="Store" />
          <NavLink to="/about" label="About" />
        </div>
      </div>
    );
  }
}

export default enhance(Nav);
