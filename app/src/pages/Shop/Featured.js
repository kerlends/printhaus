/* @flow */

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'components';

type ItemProps = {
  image: string,
  title: string,
  id: string,
  to?: string,
};

const Item = ({ image, title, to }: ItemProps) => (
  <Link to={to}>
    <Typography type="subheading">{title}</Typography>
    <img src={image} alt={title} />
  </Link>
);

type Props = {
  items: Array<ItemProps>,
};

const Featured = ({ match, items }: Props) => (
  <React.Fragment>
    <Typography type="headline">featured</Typography>
    {items.length ? (
      items.map(({ id, ...item }) => (
        <Item key={id} to={`${match.url}/${id}`} {...item} />
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
