// @flow

import * as React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import PrinthausLogo from './PrinthausLogo';
import NavMenuButton from './NavMenuButton';
import NavLink from './NavLink';

const enhance = withStyles((theme) => ({
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
}));

type Props = {
  classes: any,
  history: any,
  pathname: any,
};

type State = {
  show: boolean,
};

class Navbar extends React.Component<Props, State> {
  state = {
    show: false,
  };

  componentDidUpdate(lastProps: Props) {
    if (
      this.props.pathname !== lastProps.pathname &&
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

export default enhance(Navbar);
