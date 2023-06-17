module.exports = {
  // ... altre configurazioni di Webpack ...
  module: {
    rules: [
      // ... altre regole ...
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  },
};
