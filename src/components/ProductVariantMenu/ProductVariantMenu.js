/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';

import findVariantById from '../../utils/findVariantById';
import Cost from '../Cost';
import ProductVariant from '../ProductVariant';
import { CartConsumer } from '../Cart/Cart';

const enhance = withStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit * 2,
  },
  tooltipPlacementBottom: {
    transformOrigin: 'center top',
    margin: '12px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '8px 0',
    },
  },
}));

type Props = {
  classes: any,
  variants: Array<React.ElementProps<typeof ProductVariant>>,
};

type State = {
  activeVariantId: string,
  open: boolean,
  tooltipVisible: boolean,
};

class ProductVariantMenu extends React.Component<Props, State> {
  anchorEl = React.createRef();

  state = {
    activeVariantId: this.props.variants[0].id,
    open: false,
    tooltipVisible: false,
  };

  toggle = () =>
    this.setState(({ open }) => ({
      open: !open,
    }));

  close = () => this.setState({ open: false });

  handleVariantSelect = (id: string) =>
    this.setState({ activeVariantId: id, open: false });

  showTooltip = () => {
    this.setState({ tooltipVisible: true });
  };

  hideTooltip = () => {
    this.setState({ tooltipVisible: false });
  };

  render() {
    const { classes, variants } = this.props;
    const { activeVariantId, open } = this.state;

    const activeVariant = findVariantById(
      activeVariantId,
      variants,
    );

    return (
      <div className={classes.container}>
        {variants.length > 1 ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <Cost value={activeVariant.price} />
        )}
        <CartConsumer>
          {({ add }) => (
            <ClickAwayListener onClickAway={this.hideTooltip}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  classes={{
                    tooltipPlacementBottom:
                      classes.tooltipPlacementBottom,
                  }}
                  open={this.state.tooltipVisible}
                  onClose={this.hideTooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Added to cart"
                >
                  <Button
                    color="secondary"
                    disabled={!activeVariant.availableForSale}
                    onClick={() => {
                      add(activeVariantId);
                      this.showTooltip();
                    }}
                  >
                    Add to Cart
                  </Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
          )}
        </CartConsumer>
      </div>
    );
  }
}

export default enhance(ProductVariantMenu);
