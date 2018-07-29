/* @flow */

import * as React from 'react';
import Fade from '@material-ui/core/Fade';

const loadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = src;
  });

type Props = {
  children: React.Node,
  data: Array<string>,
};

type State = {
  loaded: boolean,
};

class Images extends React.Component<Props, State> {
  static cache = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: props.data.every(
        (img) => Images.cache.indexOf(img) >= 0,
      ),
    };
  }

  componentDidMount() {
    if (!this.state.loaded) this.loadImages(this.props.data);
  }

  loadImages = async (images: Array<string>) => {
    await Promise.all(images.map(loadImage));
    this.setState({ loaded: true });
  };

  render() {
    return (
      <Fade in={this.state.loaded}>{this.props.children}</Fade>
    );
  }
}

export default Images;
