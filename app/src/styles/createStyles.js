// @flow

import * as React from 'react';
import { css } from 'glamor';
import type { Theme } from './createTheme';

type InputStyleMap<T> = {
  [key: $Keys<T>]: Object,
};

type ClassNameMap<T: {}> = {
  [key: $Keys<T>]: string,
};

const themeManager = new WeakMap();

function createStyles<T>(
  stylesFactory: (theme: Theme) => InputStyleMap<T>,
  theme: Theme,
): ClassNameMap<T> {
  let sheetManager = themeManager.get(theme);

  if (!sheetManager) {
    sheetManager = new WeakMap();
    themeManager.set(theme, sheetManager);
  }

  let classes = sheetManager.get(stylesFactory);

  if (!classes) {
    const styles = stylesFactory(theme);

    classes = {};

    Object.keys(styles).forEach((key) => {
      const rule = styles[key];
      rule.label = key;
      classes[key] = css(rule);
    });

    sheetManager.set(stylesFactory, classes);
  }

  return classes;
}
