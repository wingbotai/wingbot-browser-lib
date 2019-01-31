#!/usr/bin/env node
/* eslint no-console: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

let targetStage = 'development';

const args = process.argv.slice();

function abort (msg) {
    console.error('  %s', msg);
    process.exit(1);
}

let arg;

function required () {
    if (args.length) {
        return args.shift();
    }
    return abort(`${arg} requires an argument`);
}

// parse arguments

while (args.length) {
    arg = args.shift();
    switch (arg) {
        case '-s':
        case '--stage':
            // @ts-ignore
            targetStage = required();
            break;
        default:
            break;
    }
}

process.env.NODE_ENV = targetStage;

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const webpackConfig = require('../webpack.config');

webpackConfig.mode = targetStage === 'development'
    ? 'development'
    : 'production';

// enable CSS compression
/* webpackConfig.module.rules[0].use[2] = {
    loader: 'sass-loader',
    // @ts-ignore
    options: { outputStyle: 'compressed' }
}; */

// add definer
const definer = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(targetStage)
    }
});
webpackConfig.plugins.push(definer);


// returns a Compiler instance
// @ts-ignore
const compiler = webpack(webpackConfig);

// setup templating

const distPath = path.join(__dirname, '..', 'dist');

console.log('Cleaning up dist dir');

const files = fs.readdirSync(distPath);

for (const file of files) {
    if (file.match(/\.(js|html)(\.gz)?$/)) {
        fs.unlinkSync(path.join(distPath, file));
    }
}

console.log(`Building for stage: ${targetStage}`);

compiler.run((err) => {
    if (err) {
        console.error('Build failed', err);
        process.exit(1);
    } else {
        console.log('Build is done.');
    }
});
