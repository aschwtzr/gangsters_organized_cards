const react = require('@neutrinojs/react');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    react({
      html: {
        title: 'boardgame_gangsters'
      },
      devServer: {
        port: 8001
      },
    }),
    (neutrino) => {
      neutrino.config.module
        .rule('csv-loader')
        .test(/\.csv$/)
        .use('csv-loader')
        .loader('csv-loader')
        .options({
          header: true,
          skipEmptyLines: true,
          download: false,
        });
    }
  ],
  rules: [
    {
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        header: true,
        skipEmptyLines: true,
        download: false,
      }
    }
  ]
};
