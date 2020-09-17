const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main/main.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {
                test: /\.(js)$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
        ]
    },
    devtool: "source-map"
};
