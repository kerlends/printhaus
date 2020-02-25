import React, { useCallback, useRef } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Carousel from '../Carousel';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,.5)',
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  title: {
    color: 'white',
  },
}));

type Image = {
  localFile: {
    childImageSharp: {
      sizes: any;
    };
  };
};

type Props = {
  images: Array<Image>;
  title: string;
};

const Card: React.FC<Props> = ({ images, title }) => {
  const classes = useStyles();
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = useCallback(() => {
    if (titleContainerRef.current)
      titleContainerRef.current.style.opacity = '1';
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (titleContainerRef.current)
      titleContainerRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      className={classes.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel images={images} disableNavigation />
      <div className={classes.titleContainer} ref={titleContainerRef}>
        <Typography align="center" className={classes.title} variant="h5">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
