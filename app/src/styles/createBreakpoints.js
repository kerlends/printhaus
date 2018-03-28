// @flow

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const breakpointKeys: Array<BreakpointKey> = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

type BreakpointValues = {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
};

export type Breakpoints = {
  keys: Array<BreakpointKey>,
  values: BreakpointValues,
  up: (key: BreakpointKey) => string,
  down: (key: BreakpointKey) => string,
  between: (start: BreakpointKey, end: BreakpointKey) => string,
  only: (key: BreakpointKey) => string,
  width: (key: BreakpointKey) => number,
};

const createBreakpoints = (
  breakpoints: {
    values?: BreakpointValues,
    unit?: string,
    step?: number,
  } = {},
): Breakpoints => {
  const {
    values = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    unit = 'px',
    step = 5,
    ...rest
  } = breakpoints;

  const up = (key: BreakpointKey): string => {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width: ${value}${unit})`;
  };

  const down = (key: BreakpointKey): string => {
    const lastIx = breakpointKeys.indexOf(key) + 1;
    const upperBound = values[breakpointKeys[lastIx]];

    if (lastIx === breakpointKeys.length) return up('xs');

    const value =
      typeof upperBound === 'number' && lastIx > 0 ? upperBound : key;

    if (typeof value === 'number')
      return `@media (max-width: ${value - step / 100}${unit})`;

    throw new Error(`Invalid value type for breakpoint bound: ${value}`);
  };

  const between = (start: BreakpointKey, end: BreakpointKey): string => {
    const lastIx = breakpointKeys.indexOf(end) + 1;

    if (lastIx === breakpointKeys.length) return up(start);

    return [
      `@media (min-width: ${values[start]})${unit})`,
      `(max-width: ${values[breakpointKeys[lastIx]] - step / 100}${unit}`,
    ].join(' and ');
  };

  const only = (key: BreakpointKey): string => between(key, key);

  const width = (key: BreakpointKey): number => values[key];

  return {
    keys: breakpointKeys,
    values,
    up,
    down,
    between,
    only,
    width,
    ...rest,
  };
};

export default createBreakpoints;
