'use strict';

exports.onRouteUpdate = function (_ref) {
  var location = _ref.location;

  if (process.env.NODE_ENV !== 'production' || typeof window.rg4js !== 'function') return;

  window.rg4js('trackEvent', {
    type: 'pageView',
    path: location.pathname
  });
};