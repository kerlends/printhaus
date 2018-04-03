/* @flow */

import * as React from 'react';
import { Card, Typography } from 'components';

type FeaturedItem = {
  image: string,
  title: string,
};

type Props = {
  items: Array<FeaturedItem & { id: string }>,
  match: Object,
};

const Featured = ({ match, items }: Props) => (
  <React.Fragment>
    <Typography type="title">featured</Typography>
    {items.length ? (
      items.map(({ id, image, title }) => (
        <Card
          key={id}
        to={`${match.url}/${id}`} media={image} title={title} />
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
