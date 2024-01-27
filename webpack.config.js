const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: './.env.development.local' });


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
};

