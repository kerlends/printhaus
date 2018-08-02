// @flow

export const tagsArrayToString = (tags: Array<string>) =>
  `[${tags.map((tag) => `'${tag}'`).join(', ')}]`;
