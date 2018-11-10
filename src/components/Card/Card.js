/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Carousel } from '../Carousel';

const enhance = withStyles((theme) => ({
  card: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px`,
    borderRadius: theme.spacing.unit,
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
    padding: theme.spacing.unit,
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
      sizes: any,
    },
  },
};

type Props = {
  classes: any,
  images: Array<Image>,
  title: string,
};

class Card extends React.Component<Props> {
  titleRef = React.createRef();

  handleMouseEnter = (evt) => {
    this.titleRef.current.style.opacity = 1;
  };

  handleMouseLeave = (evt) => {
    this.titleRef.current.style.opacity = 0;
  };

  render() {
    const { classes, images, title } = this.props;
    return (
      <div
        className={classes.card}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Carousel images={images} disableNavigation />
        <div
          className={classes.titleContainer}
          ref={this.titleRef}
        >
          <Typography
            align="center"
            className={classes.title}
            variant="headline"
          >
            {title}
          </Typography>
        </div>
      </div>
    );
  }
}

export default enhance(Card);
