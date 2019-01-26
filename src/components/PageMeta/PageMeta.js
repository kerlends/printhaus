/* @flow */

import * as React from 'react';
import { Helmet } from 'react-helmet';

const sharedKeywords = [
  'printhaus',
  'photography',
  'store',
  'goth',
  'portland',
  'iceland',
];

const PageMeta = ({ description, keywords, title }) => {
  const joinedTitle = Array.isArray(title)
    ? ['printhaus', ...title].join(' | ')
    : `printhaus | ${title}`;

  const meta = [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: sharedKeywords.concat(keywords).join(', '),
    },
  ];

  return (
    <Helmet title={joinedTitle.toLowerCase()} meta={meta} />
  );
};

PageMeta.defaultProps = {
  description: 'printhaus store',
  keywords: [],
};

export default PageMeta;
