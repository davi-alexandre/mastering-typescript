const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

// RUN: npx webpack --config webpack.config.js
// or : npx webpack (o parametro acima é padrão)