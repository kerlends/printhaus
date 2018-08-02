'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      setPostBodyComponents = _ref.setPostBodyComponents;

  if (process.env.NODE_ENV !== 'production') return;

  if (!pluginOptions) {
    throw new Error('[gatsby-plugin-raygun] no API key found');
  }

  var apiKey = pluginOptions.apiKey,
      _pluginOptions$crashR = pluginOptions.crashReporting,
      crashReporting = _pluginOptions$crashR === undefined ? true : _pluginOptions$crashR,
      _pluginOptions$userMo = pluginOptions.userMonitoring,
      userMonitoring = _pluginOptions$userMo === undefined ? false : _pluginOptions$userMo,
      _pluginOptions$tags = pluginOptions.tags,
      tags = _pluginOptions$tags === undefined ? [] : _pluginOptions$tags;


  setHeadComponents([_react2.default.createElement('script', {
    key: 'gatsby-plugin-raygun-load',
    dangerouslySetInnerHTML: {
      __html: '\n          !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){\n          (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],\n          f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){\n          h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({\n          e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");\n        '
    }
  })]);

  setPostBodyComponents([_react2.default.createElement('script', {
    key: 'gatsby-plugin-raygun-init',
    dangerouslySetInnerHTML: {
      __html: '\n          rg4js(\'apiKey\', \'' + apiKey + '\');\n          ' + (crashReporting ? "rg4js('enableCrashReporting', true);" : '') + '\n          ' + (userMonitoring ? "rg4js('enablePulse', true);" : '') + '\n          ' + (tags.length > 0 ? 'rg4js(\'withTags\', ' + (0, _utils.tagsArrayToString)(tags) + ')' : '') + '\n        '
    }
  })]);

  return null;
};