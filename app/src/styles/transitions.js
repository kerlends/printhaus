// @flow

export const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
};

export const formatMs = (milliseconds: number): string =>
  `${Math.round(milliseconds)}ms`;
export const isString = (value: any): boolean => typeof value === 'string';
export const isNumber = (value: any): boolean =>
  !Number.isNaN(parseFloat(value));

const transitions = {
  easing,
  duration,
  create: (
    props: string | Array<string> = ['all'],
    options: {
      prop?: string,
      duration?: number,
      easing?: string,
      delay?: number,
    } = {},
  ): string => {
    const {
      duration: durationOption = duration.standard,
      easing: easingOption = easing.easeInOut,
      delay = 0,
    } = options;

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${formatMs(
            durationOption,
          )} ${easingOption} ${formatMs(delay)}`,
      )
      .join(',');
  },
  getAutoHeightDuration: (height: ?number) => {
    if (!height) {
      return 0;
    }
    const constant = height / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  },
};

export default transitions;
