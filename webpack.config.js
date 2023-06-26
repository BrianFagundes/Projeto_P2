// const webpack = require('webpack');
// const nodemailer = require('nodemailer');
// const path = require('path');
// const os = require('os');
// const crypto = require('crypto');
// const stream = require('stream');
// const transport = nodemailer.createTransport({
//     // outras configurações...
//     streamTransport: true, // certifique-se de que está definido como true
//     streamTransportOptions: {
//       // opções do transporte de stream, se necessário
//     }
//   });
  


// module.exports = {
//   mode: 'development', // ou 'production'
//   entry: './src/index.html', // Verifique se o caminho está correto
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   resolve: {
//     fallback: {
//       net: require.resolve('net'),
//       tls: require.resolve('tls'),
//       os: require.resolve('os-browserify/browser'),
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify')
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.html$/i,
//         loader: 'html-loader',
//       },
//     ],
//   },
//   plugins: [
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//       Buffer: ['buffer', 'Buffer']
//     })
//   ]
// };
