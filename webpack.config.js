/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        webchat: './src/webchat/index.js',
        botchat: './src/botchat/index.js'
    },
    output: {
        path: path.join(__dirname, 'docs'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // exclude just isomorph libraries
                // exclude: /node_modules(\\|\/)(?!(prg-editor)(\\|\/)).*/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'entry',
                                targets: {
                                    browsers: ['> 1%', 'last 3 versions', 'ie >= 10']
                                }
                            }
                        ]
                    ],
                    plugins: [
                        // '@babel/plugin-proposal-class-properties',
                        // '@babel/plugin-transform-object-set-prototype-of-to-assign',
                        // ['@babel/plugin-transform-runtime', { useESModules: true, corejs: 2 }],
                        // '@babel/plugin-proposal-object-rest-spread'
                    ],
                    cacheDirectory: true
                }
            }
        ]
    }
};
