'use strict';

module.exports = function config(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      },
    ],
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ];

  if (process.env.NODE_ENV === 'test') {
    return {
      presets: ['@babel/preset-env'],
      plugins,
    };
  }
  return {
    presets,
    plugins,
  };
};
