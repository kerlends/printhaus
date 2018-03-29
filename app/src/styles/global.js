/* @flow */

import { css } from 'glamor';
import { transparentize } from 'polished';
import common from 'styles/colors/common';

css.insert(`body {
  color: ${common.black};
  text-shadow: 0 .5px .5px ${transparentize(0.8, common.grey)};
}`);
