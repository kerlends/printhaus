// @flow

import * as React from 'react';
import { omit, pick } from 'ramda';
import { merge, withStyles } from 'styles';

const enhance = withStyles((styles) => {
  const kinds = pickTypographyTypes(styles.typography);

  return {
    ...kinds,
    ...align,
    root: {
      display: 'block',
      margin: 0,
    },
    noWrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    bottomGutter: {
      marginBottom: '.35em',
    },
    paragraph: {
      marginBottom: styles.spacing.unit * 2,
    },
    uppercase: {
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  };
});

type AlignKey = 'left' | 'right' | 'center' | 'justify' | 'inherit';

type AlignMap = {
  [key: AlignKey]: {
    textAlign: AlignKey,
  },
};

type H = React.ElementType;

type HeadlineMapping = {
  brand: H,
  headline: H,
  title: H,
  subheading: H,
  body1: H,
  body2: H,
};

type Kind =
  | 'brand'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button';

const alignments = ['left', 'right', 'center', 'justify', 'inherit'];
const align: AlignMap = {};
alignments.forEach(
  (dir) =>
    (align[dir] = {
      textAlign: dir,
    }),
);

const pickTypographyTypes = pick([
  'brand',
  'headline',
  'title',
  'subheading',
  'body1',
  'body2',
  'caption',
  'button',
]);

type Props = {
  align: AlignKey,
  classes: Object,
  styles: Object,
  type: Kind,
  headlineMapping: HeadlineMapping,

  paragraph?: boolean,
  bottomGutter?: boolean | number,
  color?: 'default' | 'primary' | 'secondary',
  className?: string | Object,
  component?: Function | string,
  noWrap?: boolean,
  uppercase?: boolean,
  weight?: 'light' | 'regular' | 'medium' | 'bold',
};

const Typography = ({
  align: alignProp,
  bottomGutter,
  classes,
  className,
  component,
  noWrap,
  paragraph,
  type,
  headlineMapping,
  uppercase,
  ...props
}: Props) => {
  const Component =
    component || (paragraph ? 'p' : headlineMapping[type]) || 'span';

  return (
    <Component
      className={merge([
        classes.root,
        classes[type],
        classes[alignProp],
        noWrap && classes.noWrap,
        bottomGutter && classes.bottomGutter,
        paragraph && classes.paragraph,
        uppercase && classes.uppercase,
        className,
      ])}
      {...omit(['align', 'color', 'weight'], props)}
    />
  );
};

Typography.defaultProps = {
  align: 'inherit',
  headlineMapping: {
    brand: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    body1: 'p',
    body2: 'aside',
  },
  type: 'body1',
  styles: {},
};

export default enhance(Typography);
