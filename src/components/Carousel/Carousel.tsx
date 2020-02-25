import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Img from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) => ({
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
      sizes: any;
    };
  };
};

interface Props {
  disableNavigation: boolean;
  images: Array<Image>;
}

type State = {
  activeSlideIndex: number;
};

const Carousel: React.FC<Props> = ({ disableNavigation, images }) => {
  const classes = useStyles();
  const [index, setIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !buttonsRef.current) return;
    const { height } = containerRef.current.getBoundingClientRect();
    buttonsRef.current.style.top = `${height / 2}px`;
  }, []);

  useEffect(() => {
    if (!slidesRef.current) return;
    slidesRef.current.style.transform = `translateX(-${index * 100})`;
  }, [index]);

  const handleNextSlideClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    },
    [images],
  );

  const handlePrevSlideClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      setIndex((prevIndex) =>
        prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1,
      );
    },
    [images],
  );

  const activeSlideImage = images[index];

  if (!activeSlideImage) return null;

  if (images.length === 1 || disableNavigation) {
    return <Img sizes={activeSlideImage.localFile.childImageSharp.sizes} />;
  }

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.buttonContainer} ref={buttonsRef}>
        <IconButton disabled={index === 0} onClick={handlePrevSlideClick}>
          <ChevronLeft />
        </IconButton>
        <IconButton
          disabled={index === images.length - 1}
          onClick={handleNextSlideClick}
        >
          <ChevronRight />
        </IconButton>
      </div>
      <div className={classes.slides} ref={slidesRef}>
        {images.map((image, index) => (
          <div className={classes.slide} key={index}>
            <Img sizes={image.localFile.childImageSharp.sizes} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
