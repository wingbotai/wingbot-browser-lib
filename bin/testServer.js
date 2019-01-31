/*
 * @author David Menger
 */

const express = require('express');
const webpackDev = require('webpack-dev-middleware');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../webpack.config');


const app = express();

// @ts-ignore
const compiler = webpack(Object.assign(webpackConfig, {
    devtool: 'cheap-module-eval-source-map'
}));

app.use(webpackDev(compiler, {
    publicPath: '/',
    stats: 'minimal'
}));

app.use(express.static(path.resolve(__dirname, '..', 'examples')));

app.listen(3000, (err) => {
    if (err) {
        console.error('test server run failed', err); // eslint-disable-line no-console
    } else {
        console.log('test server is running on port 3000'); // eslint-disable-line no-console
    }
});
