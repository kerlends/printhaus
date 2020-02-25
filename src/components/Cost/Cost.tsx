import React, { useMemo } from 'react';
import numeral from 'numeral';

interface Props {
  value: number | string;
}

const Cost: React.FC<Props> = ({ value }) => {
  const cost = useMemo(() => numeral(value).format('$0.00'), [value]);
  return <span>{cost}</span>;
};

export default Cost;
