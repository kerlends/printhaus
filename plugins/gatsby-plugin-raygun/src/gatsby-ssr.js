// @flow

import React, { type Element } from 'react';
import { tagsArrayToString } from './utils';

type SetComponents = (components: Array<Element<'script'>>) => void;

type PluginOptions = {
  apiKey: string,
  crashReporting?: boolean,
  userMonitoring?: boolean,
  tags?: Array<string>,
};

exports.onRenderBody = (
  {
    setHeadComponents,
    setPostBodyComponents,
  }: {
    setHeadComponents: SetComponents,
    setPostBodyComponents: SetComponents,
  },
  pluginOptions: PluginOptions,
) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (!pluginOptions) {
    throw new Error('[gatsby-plugin-raygun] no API key found');
  }

  const {
    apiKey,
    crashReporting = true,
    userMonitoring = false,
    tags = [],
  } = pluginOptions;

  setHeadComponents([
    <script
      key="gatsby-plugin-raygun-load"
      dangerouslySetInnerHTML={{
        __html: `
          !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
          (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
          f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
          h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
          e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
        `,
      }}
    />,
  ]);

  setPostBodyComponents([
    <script
      key="gatsby-plugin-raygun-init"
      dangerouslySetInnerHTML={{
        __html: `
          rg4js('apiKey', '${apiKey}');
          ${crashReporting ? "rg4js('enableCrashReporting', true);" : ''}
          ${userMonitoring ? "rg4js('enablePulse', true);" : ''}
          ${
            tags.length > 0
              ? `rg4js('withTags', ${tagsArrayToString(tags)})`
              : ''
          }
        `,
      }}
    />,
  ]);

  return null;
};
