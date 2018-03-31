// @flow

import * as React from 'react';
import { merge } from 'glamor';
import { omit, pick } from 'ramda';
import withStyles from 'styles/withStyles';

type AlignKey = 'left' | 'right' | 'center' | 'justify' | 'inherit';

type AlignMap = {
  [key: AlignKey]: {
    textAlign: AlignKey,
  },
};

type Kind =
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button';

const align: AlignMap = {};
(() =>
  ['left', 'right', 'center', 'justify', 'inherit'].forEach(
    (dir) =>
      (align[dir] = {
        textAlign: dir,
      }),
  ))();

const pickTypographyTypes = pick([
  'headline',
  'title',
  'subheading',
  'body1',
  'body2',
  'caption',
  'button',
]);

const enhance = withStyles((styles) => {
  return {
    ...pickTypographyTypes(styles.typography),
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

type Props = {
  align: AlignKey,
  classes: Object,
  styles: Object,
  type: Kind,
  headlineMapping: Object,

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
