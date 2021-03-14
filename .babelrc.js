module.exports = {
  presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
};
