// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { ShopListItem } from '../../components';

const enhance = withStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: `${theme.spacing.unit}px`,
    gridRowGap: `${theme.spacing.unit * 3}px`,
    padding: theme.spacing.unit,
  },
}));

type Props = {
  classes: any,
  products: Array<any>,
};

class ShopList extends React.Component<Props> {
  container: HTMLDivElement;

  componentDidMount() {
    this.observer = new IntersectionObserver(
      this.handleVisible,
      {
        root: this.container,

        rootMargin: '0px',
        threshold: 1,
      },
    );
  }

  handleVisible = (
    entries: Array<IntersectionObserverEntry>,
  ) => {
    entries.forEach((entry) => {
      entry.target.style.borderWidth = 1;
      entry.target.style.borderColor = entry.isIntersecting
        ? 'black'
        : 'transparent';
    });
  };

  getRef = (node: HTMLDivElement | null) => {
    if (node) this.container = node;
  };

  getItemRef = (el: HTMLDivElement, index: number) => {
    if (this.nodes[index] || !el) return;
    alert(index);
    this.nodes.push(el);
    this.observer(el);
  };

  render() {
    const { classes, products } = this.props;
    return (
      <Fade
        in
        appear
        timeout={{
          enter: 500,
          exit: 1000,
        }}
      >
        <div ref={this.getRef} className={classes.root}>
          {products.map((item, index) => (
            <ShopListItem
              key={item.title}
              innerRef={(n) => this.getItemRef(n, index)}
              {...item}
            />
          ))}
        </div>
      </Fade>
    );
  }
}

export default enhance(ShopList);
