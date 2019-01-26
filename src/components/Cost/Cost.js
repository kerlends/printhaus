/* @flow */

import * as React from 'react';
import numeral from 'numeral';

const Cost = ({ value }) => numeral(value).format('$0.00');

export default Cost;
