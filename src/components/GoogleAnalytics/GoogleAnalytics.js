/* @flow */

import * as React from 'react';

type RenderProp = (dispatch: Function) => React.Node;

type Props = {
  children: React.Node | RenderProp,
  onMount?: boolean,

  category: string,
  action: string,
  label?: string,
  value?: number,
};

class GoogleAnalytics extends React.Component<Props> {
  static queue: Array<any> = [];

  componentDidMount() {
    if (this.props.onMount) this.dispatch();
  }

  dispatch = () => {
    const { category, action, label, value } = this.props;
    this.ga('send', 'event', category, action, label, value);
  };

  ga = (...event: Array<any>) => {
    if (typeof window === 'undefined') return;

    if (!window.ga) {
      GoogleAnalytics.queue.push(event);
      return;
    }

    if (GoogleAnalytics.queue.length > 0) {
      while (GoogleAnalytics.length > 0) {
        const queuedEvent = GoogleAnalytics.queue.pop();
        window.ga(...queuedEvent);
      }
    }

    window.ga(...event);
  };

  render() {
    const { children } = this.props;
    return typeof children === 'function'
      ? children(this.dispatch)
      : children;
  }
}

export default GoogleAnalytics;
