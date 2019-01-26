/* @flow */

import * as React from 'react';

class GoogleAnalytics extends React.Component {
  static queue = [];

  componentDidMount() {
    if (this.props.onMount) this.dispatch();
  }

  dispatch = () => {
    const { category, action, label, value } = this.props;
    this.ga('send', 'event', category, action, label, value);
  };

  ga = (...event) => {
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
