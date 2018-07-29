/* @flow */

import * as React from 'react';

type Props = {
  // props
};

class Virtualized extends React.Component<Props> {
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

  getRef = (node: HTMLDivElement | null) => {
    if (node) this.container = node;
  };

  render() {
    return <div ref={this.getRef}>{this.props.children}</div>;
  }
}

export default Virtualized;
