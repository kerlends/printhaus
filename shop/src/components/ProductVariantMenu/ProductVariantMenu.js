/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import Cost from '../Cost';
import ProductVariant from '../ProductVariant';

const enhance = withStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing.unit * 2,
  },
}));

type Props = {
  classes: any,
  variants: Array<React.ElementProps<typeof ProductVariant>>,
};

type State = {
  activeVariantId: string,
  open: boolean,
};

class ProductVariantMenu extends React.Component<Props, State> {
  anchorEl = React.createRef();

  state = {
    activeVariantId: this.props.variants[0].id,
    open: false,
  };

  toggle = () =>
    this.setState(({ open }) => ({
      open: !open,
    }));

  close = () => this.setState({ open: false });

  handleVariantSelect = (id: string) =>
    this.setState({ activeVariantId: id, open: false });

  render() {
    const { classes, variants } = this.props;
    const { activeVariantId, open } = this.state;

    const activeVariant = variants.find(
      ({ id }) => activeVariantId === id,
    );

    return (
      <div className={classes.container}>
        <Button
          buttonRef={this.anchorEl}
          variant="outlined"
          onClick={this.toggle}
        >
          {`${activeVariant.title}: `}
          <Cost value={activeVariant.price} />
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={this.close}>
                  <MenuList>
                    {variants.map((variant) => (
                      <ProductVariant
                        key={variant.id}
                        onClick={this.handleVariantSelect}
                        {...variant}
                      />
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default enhance(ProductVariantMenu);
