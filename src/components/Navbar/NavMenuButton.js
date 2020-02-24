// @flow

import * as React from 'react';

import { styler, tween, easing } from 'popmotion';
import { interpolate } from 'polymorph-js';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const enhance = withStyles((theme) => ({
  button: {
    transition: theme.transitions.create('color'),
  },
}));

const paths = {
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  close:
    'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
};

type Props = {
  classes: any,
  onClick: Function,
  menuOpen: boolean,
};

class NavMenuButton extends React.Component<Props> {
  componentDidUpdate(lastProps: Props) {
    if (this.props.menuOpen && !lastProps.menuOpen)
      this.morph(true);
    else if (!this.props.menuOpen && lastProps.menuOpen)
      this.morph(false);
  }

  morph = (out: boolean) => {
    const pathInterp = out
      ? [paths.menu, paths.close]
      : [paths.close, paths.menu];

    const options = {
      addPoints: 5,
      precision: 4,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };

    const shape = styler(this.pathRef);
    const morph = interpolate(pathInterp, options);

    tween({
      duration: 200,
      ease: easing.easeInOut,
      flip: 0,
    })
      .pipe(morph)
      .start(shape.set('d'));
  };

  getPathRef = (node: Element | null) => {
    if (node) this.pathRef = node;
  };

  pathRef: Element;

  render() {
    const { classes, menuOpen, onClick } = this.props;
    return (
      <IconButton
        color={menuOpen ? 'primary' : 'secondary'}
        onClick={onClick}
        aria-label="Menu"
        className={classes.button}
      >
        <SvgIcon>
          <path d={paths.menu} ref={this.getPathRef} />
        </SvgIcon>
      </IconButton>
    );
  }
}

export default enhance(NavMenuButton);
