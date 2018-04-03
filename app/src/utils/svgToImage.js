/* @flow */

const prefix = 'data:image/svg+xml;base64,';

const getPathColor = (svg: Element): string => {
  const path = svg.querySelector('path');
  if (!path) return 'currentColor';

  return (
    path.getAttribute('stroke') || path.getAttribute('fill') || 'currentColor'
  );
};

const setPathColor = (svg, color) => {
  const path = svg.querySelector('path');
  const key =
    !path.getAttribute('stroke') && path.getAttribute('fill')
      ? 'fill'
      : 'stroke';
  Array.from(svg.querySelectorAll('path')).forEach((path) =>
    path.setAttribute(key, color),
  );
};

const svgToImage = (svg, { exclude = [], color } = {}) => {
  const serializer = new XMLSerializer();
  const serialize = (svg) =>
    prefix + window.btoa(serializer.serializeToString(svg));

  const toExclude = exclude.filter(Boolean);

  toExclude.forEach((node) => svg.removeChild(node));

  let data;

  if (color) {
    const baseColor = getPathColor(svg);

    setPathColor(svg, color);

    data = serialize(svg);

    setPathColor(svg, baseColor);
  } else {
    data = serialize(svg);
  }

  toExclude.forEach((node) => svg.appendChild(node));

  return data;
};

export default svgToImage;
