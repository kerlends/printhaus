/* @flow */

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'components';

type FeaturedItem = {
  image: string,
  title: string,
};

type ItemProps = FeaturedItem & { to: string };

const Item = ({ image, title, to }: ItemProps) => (
  <Link to={to}>
    <Typography type="subheading">{title}</Typography>
    <img src={image} alt={title} />
  </Link>
);

type Props = {
  items: Array<FeaturedItem & { id: string }>,
  match: Object,
};

const Featured = ({ match, items }: Props) => (
  <React.Fragment>
    <Typography type="headline">featured</Typography>
    {items.length ? (
      items.map(({ id, image, title }) => (
        <Item key={id} to={`${match.url}/${id}`} image={image} title={title} />
      ))
    ) : (
      <Typography type="title">nothing found</Typography>
    )}
  </React.Fragment>
);

Featured.defaultProps = {
  items: [],
};

export default Featured;
