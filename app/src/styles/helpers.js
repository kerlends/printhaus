/* @flow */

type DirectionProps = {
  top?: number | 'auto',
  bottom?: number | 'auto',
  left?: number | 'auto',
  right?: number | 'auto',
};

const createDirectionBaseRuleFactory = (propertyName: string) => {
  const join = (direction: string) => `${propertyName}${direction}`;

  return ({ top, bottom, left, right }: DirectionProps) => {
    const rule = {};
    if (top) rule[join('Top')] = top;
    if (bottom) rule[join('Bottom')] = bottom;
    if (left) rule[join('Left')] = left;
    if (right) rule[join('Right')] = right;
    return rule;
  };
};

export const padding = createDirectionBaseRuleFactory('padding');

export const margin = createDirectionBaseRuleFactory('margin');
