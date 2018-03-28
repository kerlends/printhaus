// @flow

import { mergeDeepLeft } from 'ramda';

export const round = (value: number) => Math.round(value * 1e5) / 1e5;

type TypographyType = {
  fontSize: string,
  fontWeight: number,
  fontFamily: string,
  lineHeight: string,
};

export type Typography = {
  fontFamily: string,
  fontSize: number,
  fontWeightLight: string,
  fontWeightRegular: string,
  fontWeightMedium: string,
  fontWeightBold: string,

  headline: TypographyType,
  title: TypographyType,
  subheading: TypographyType,
  body2: TypographyType,
  body1: TypographyType,
  caption: TypographyType,
  button: TypographyType,

  toRem: (value: number) => string,
};

const createTypography = (options: Object = {}): Typography => {
  const {
    fontFamily = '"CircularStd", "Helvetica Neue", "Arial", sans-serif',
    fontSize = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    ...rest
  } = options;

  const toRem = (value: number): string => `${value / htmlFontSize}rem`;

  return mergeDeepLeft(
    {
      toRem,
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightBold,
      headline: {
        fontSize: toRem(24),
        fontWeight: fontWeightLight,
        fontFamily,
        lineHeight: `${round(32.5 / 24)}em`,
      },
      title: {
        fontSize: toRem(21),
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24.5 / 21)}em`,
      },
      subheading: {
        fontSize: toRem(16),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(24 / 16)}em`,
      },
      body2: {
        fontSize: toRem(14),
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24 / 14)}em`,
      },
      body1: {
        fontSize: toRem(14),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(20.5 / 14)}em`,
      },
      caption: {
        fontSize: toRem(12),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(16.5 / 12)}em`,
      },
      button: {
        fontSize: toRem(fontSize),
        textTransform: 'uppercase',
        fontWeight: fontWeightMedium,
        fontFamily,
      },
    },
    rest,
  );
};

export default createTypography;
