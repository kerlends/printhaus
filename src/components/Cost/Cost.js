/* @flow */

import * as React from 'react';
import numeral from 'numeral';

type Props = {
  value: number | string,
};

const Cost = ({ value }: Props) =>
  numeral(value).format('$0.00');

export default Cost;
