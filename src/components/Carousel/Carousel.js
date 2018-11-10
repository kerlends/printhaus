// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Img from 'gatsby-image';

const enhance = withStyles((theme) => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    width: '100%',
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  slides: {
    display: 'flex',
    transform: 'translateX(0)',
    transition: theme.transitions.create('transform'),
  },
  slide: {
    display: 'inline-block',
    height: '100%',
    width: '100%',
    flexShrink: 0,
  },
}));

type Image = {
  localFile: {
    childImageSharp: {
      sizes: any,
    },
  },
};

type Props = {
  disableNavigation: boolean,
  images: Array<Image>,
};

type State = {
  activeSlideIndex: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    activeSlideIndex: 0,
  };

  containerRef = React.createRef();
  buttonsRef = React.createRef();
  slidesRef = React.createRef();

  componentDidMount() {
    if (!this.containerRef.current || !this.buttonsRef.current)
      return;

    const {
      height,
    } = this.containerRef.current.getBoundingClientRect();

    const offset = height / 2;

    this.buttonsRef.current.style.top = `${offset}px`;
  }

  componentDidUpdate(_, lastState) {
    const { activeSlideIndex: index } = this.state;
    if (index !== lastState.activeSlideIndex) {
      this.slidesRef.current.style.transform = `translateX(-${index *
        100}%)`;
    }
  }

  handleNextSlideClick = (evt) => {
    evt.preventDefault();

    const { images } = this.props;

    this.setState((prevState) => ({
      activeSlideIndex:
        (prevState.activeSlideIndex + 1) % images.length,
    }));
  };

  handlePrevSlideClick = (evt) => {
    evt.preventDefault();

    const { images } = this.props;

    this.setState((prevState) => {
      const nextSlide = prevState.activeSlideIndex - 1;
      return {
        activeSlideIndex:
          nextSlide < 0 ? images.length - 1 : nextSlide,
      };
    });
  };

  _changeSlide = (slideIndex: number) => {
    this.setState({ activeSlideIndex: slideIndex });
  };

  render() {
    const { classes, disableNavigation, images } = this.props;
    const { activeSlideIndex } = this.state;

    const activeSlideImage = images[activeSlideIndex];

    if (images.length === 1 || disableNavigation) {
      return (
        <Img
          sizes={
            activeSlideImage.localFile.childImageSharp.sizes
          }
        />
      );
    }

    return (
      <div
        className={classes.container}
        ref={this.containerRef}
      >
        <div
          className={classes.buttonContainer}
          ref={this.buttonsRef}
        >
          <IconButton
            disabled={activeSlideIndex === 0}
            onClick={this.handlePrevSlideClick}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            disabled={activeSlideIndex === images.length - 1}
            onClick={this.handleNextSlideClick}
          >
            <ChevronRight />
          </IconButton>
        </div>
        <div className={classes.slides} ref={this.slidesRef}>
          {images.map((image, index) => (
            <div className={classes.slide} key={index}>
              <Img
                sizes={image.localFile.childImageSharp.sizes}
                key={index}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default enhance(Carousel);
