// @flow

exports.onRouteUpdate = ({
  location,
}: {
  location: {
    pathname: string,
    search: string | void,
    hash: string | void,
  },
}) => {
  if (
    process.env.NODE_ENV !== 'production' ||
    typeof window.rg4js !== 'function'
  )
    return;

  window.rg4js('trackEvent', {
    type: 'pageView',
    path: location.pathname,
  });
};
