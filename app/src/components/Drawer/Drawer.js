/* @flow */

import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { transparentize } from 'polished';
import { flex, merge, padding, withStyles } from 'styles';
import { List, ListItem } from 'components';

const DrawerLink = (props: any) => <ListItem component={NavLink} {...props} />;

const enhance = compose(
  withRouter,
  withStyles((styles) => ({
    stopScroll: {
      overflowY:'hidden',
    },
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: transparentize(0.55, 'black'),
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 2,
      transition: styles.transitions.create('opacity', {
        duration: 300,
        delay: 100,
      }),
    },
    backdropVisible: {
      opacity: 1,
      pointerEvents: 'auto',
      transition: styles.transitions.create('opacity', {
        duration: 150,
      }),
    },
    backdropInvisible: {
      opacity: 1,
      backgroundColor: 'transparent',
      transition: 'none',
    },
    drawer: {
      position: 'absolute',
      top: 0,
      left: -142,
      bottom: 0,
      width: 140,
      backgroundColor: 'white',
      transform: 'translateX(0)',
      transition: styles.transitions.create('transform', {
        duration: 200,
      }),
      zIndex: 3,
      ...flex({ direction: 'column', justify: 'between' }),
    },
    drawerVisible: {
      transition: styles.transitions.create('transform', {
        duration: 300,
        delay: 150,
      }),
      transform: 'translateX(140px)',
    },
    navContent: {
      padding: styles.spacing.unit,
      flex: 1,
    },
    navCloseButton: {
      ...styles.typography.caption,
      ...padding({
        top: styles.spacing.unit,
        bottom: styles.spacing.unit,
      }),
      fontFamily: styles.typography.fontFamilyBrand,
      background: 'none',
      border: 'none',
      textDecoration: 'underline',
      ':focus': {
        outline: 'none',
      },
      ':active': {
        opacity: 0.5,
      },
    },
    activeLink: {
      backgroundColor: transparentize(0.6, 'lightgrey'),
    },
  })),
);

type Props = {
  classes: any,
  invisible: boolean,
  items: Array<{ label: string, to: string }>,
  isOpen: boolean,
  location: {
    pathname: string,
  },
  onRequestClose?: Function,
};

class Drawer extends React.Component<Props> {
  componentDidUpdate(lastProps: Props) {
    if (this.props.location.pathname !== lastProps.location.pathname && this.props.isOpen)
      this.props.onRequestClose();

    if (this.props.isOpen && !lastProps.isOpen)
      document.body.classList.add(
        this.props.classes.stopScroll
      )

    if (!this.props.isOpen && lastProps.isOpen)
      document.body.classList.remove(
        this.props.classes.stopScroll
      )
  }

  handleBackdropTouch = (evt: SyntheticTouchEvent<HTMLElement>) => {
    const touched = evt.changedTouches[0];
    if (!touched) return;

    if (touched.target === this.container.current) this.props.onRequestClose();
  };

  container = React.createRef();

  render() {
    const { classes, onRequestClose, invisible, items, isOpen } = this.props;
    return (
      <div
        className={merge(
          classes.backdrop,
          invisible && classes.backdropInvisible,
          isOpen && classes.backdropVisible,
        )}
        onTouchStart={this.handleBackdropTouch}
        ref={this.container}
      >
        <aside
          className={merge(classes.drawer, isOpen && classes.drawerVisible)}
        >
          <nav className={classes.navContent}>
            <List>
              {items.map(({ label, to }) => (
                <DrawerLink
                  key={label}
                  to={to}
                  activeClassName={classes.activeLink}
                  label={label}
                />
              ))}
            </List>
          </nav>
          <button className={classes.navCloseButton} onClick={onRequestClose}>
            close
          </button>
        </aside>
      </div>
    );
  }
}

Drawer.defaultProps = {
  //invisible: true,
  isOpen: false,
};

export default enhance(Drawer);
